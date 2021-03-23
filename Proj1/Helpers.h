#ifndef HELPERS_H
#define HELPERS_H

#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
#include <unordered_map>
#include "stdio.h"
#include "State.h"
#include "Node.h"

using namespace std;

int get_num_stacks(ifstream& read_file) {
  string buffer;

  // get first number in first line
  getline(read_file, buffer);
  istringstream iss(buffer);
  iss >> buffer;
  int num_stacks = stoi(buffer);

  // get filler line
  getline(read_file, buffer);
  return num_stacks;
}

vector<vector<char>> get_vector(ifstream& read_file, int num_stacks) {
  vector<vector<char>> vec;
  string line_buffer;

  // iterate through num_stacks lines, build vector accordingly
  for (int i = 0; i < num_stacks; i++) {
    vector<char> row;
    getline(read_file, line_buffer);
    for (int i = 0; i < line_buffer.length() - 1; i++) {
      row.push_back(line_buffer[i]);
    }

    vec.push_back(row);
  }
  // get filler line
  getline(read_file, line_buffer);

  return vec;
}

struct begin_end {
  Node begin, end;
};

begin_end get_begin_end(ifstream& is) {
  int num_stacks = get_num_stacks(is);

  vector<vector<char>> begin_vec = get_vector(is, num_stacks);
  vector<vector<char>> end_vec = get_vector(is, num_stacks);

  // create states and then nodes from start and goal vectors
  begin_end b_e;
  State begin_state(begin_vec);
  Node begin_node(begin_state);
  b_e.begin = begin_node;
  State end_state(end_vec);
  Node end_node(end_state);
  b_e.end = end_node;
  return b_e;
}

// can return fail_node instead of goal if goal cannot be reached
vector<vector<char>> fail_vec = {{'!'}};
State fail_state(fail_vec);
Node fail_node(fail_state);
int max_iterations = 100000;

void print_results(Node node, int iter, int goal_tests, int max_queue_size, bool success, ofstream& os) {
  if (success) {
    os << "success! iter=" << iter << ", depth=" << node.depth() << ", num_goal_tests=" << goal_tests << ", max_queue_size=" << max_queue_size << endl;
    node.print_path(os);
  }
  else {
    os << "FAILURE - ";
    if (iter == max_iterations) {
      os << "took too long...\n";
    }
    else {
      os << "problem is not solvable...\n";
    }
  }

}

void bfs(Node begin, Node end, ofstream& os) {
  int iter=0, goal_tests=0, max_queue_size=0;

  Node node = begin;

  // base case; if the start node is the goal
  if (node.goal_test(&end.state)) {
    goal_tests++;
    print_results(node, iter, goal_tests, max_queue_size, true, os);
    return;
  }
  goal_tests++;

  // put start node frontier
  queue<Node> frontier;
  frontier.push(node);
  max_queue_size++;

  // put start node in reached
  unordered_map<string, Node> reached;
  reached[begin.hash()] = begin;

  // while we have nodes to explore and not too many iterations
  while (!frontier.empty() && iter < max_iterations) {
    node = frontier.front();
    frontier.pop();

    // create deep copy of node
    Node* parent = new Node(node.state, node.parent);

    iter++;
    if (iter % 1000 == 0) {
      os << "iter=" << iter << " agenda_size=" << frontier.size() << " curr_depth=" << parent->depth() << endl;
    }

    // iterate through node successors
    vector<State> successors = node.successors();
    for (int i = 0; i < successors.size(); i++) {
      // iter++;
      // if (iter % 1000 == 0) {
      //   os << "iter=" << iter << " agenda size=" << frontier.size() << " curr_depth=" << parent->depth() << endl;
      // }

      Node child_node(successors[i], parent);

      // if successor is the goal node
      if (child_node.goal_test(&end.state)) {
        goal_tests++;
        print_results(child_node, iter, goal_tests, max_queue_size, true, os);
        return;
      }
      goal_tests++;

      // if child_node isn't in reached
      if (reached.find(child_node.hash()) == reached.end()) {
        reached[child_node.hash()] = child_node;
        frontier.push(child_node);

        if (frontier.size() > max_queue_size) {
          max_queue_size = frontier.size();
        }
      }
    }
  }
  // failure
  print_results(fail_node, iter, goal_tests, max_queue_size, false, os);
}

#endif
