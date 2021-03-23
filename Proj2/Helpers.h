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

struct num_stacks_blocks {
  int num_stacks, num_blocks;
};


num_stacks_blocks get_num_stacks_blocks(ifstream& read_file) {
  num_stacks_blocks num_s_b;
  string buffer;

  // get first number in first line
  getline(read_file, buffer);
  istringstream iss(buffer);
  iss >> buffer;
  num_s_b.num_stacks = stoi(buffer);
  iss >> buffer;
  num_s_b.num_blocks = stoi(buffer);

  // get filler line
  getline(read_file, buffer);
  return num_s_b;
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
  int num_stacks, num_blocks;
};


begin_end get_begin_end(ifstream& is) {
  num_stacks_blocks num_s_b = get_num_stacks_blocks(is);

  vector<vector<char>> begin_vec = get_vector(is, num_s_b.num_stacks);
  vector<vector<char>> end_vec = get_vector(is, num_s_b.num_stacks);

  // create states and then nodes from start and goal vectors
  begin_end b_e;
  State begin_state(begin_vec);
  Node begin_node(begin_state);
  b_e.begin = begin_node;
  State end_state(end_vec);
  Node end_node(end_state);
  b_e.end = end_node;
  b_e.num_stacks = num_s_b.num_stacks;
  b_e.num_blocks = num_s_b.num_blocks;
  return b_e;
}


// can return fail_node instead of goal if goal cannot be reached
vector<vector<char>> fail_vec = {{'!'}};
State fail_state(fail_vec);
Node fail_node(fail_state);
int max_iterations = 100000;


void print_results(Node node, int iter, int goal_tests, int max_queue_size, int num_stacks, int num_blocks, bool success, string filename, bool screen_output, ofstream& os) {
  if (success) {
    os << filename << ", solved, " << goal_tests << ", " << max_queue_size << ", " << num_stacks << ", " << num_blocks << ", " << node.depth();
  }
  else {
    if (iter == max_iterations) {
      os << filename << ", failure (took too long), " << goal_tests << ", " << max_queue_size << ", " << num_stacks << ", " << num_blocks << ", NA";
    }
    else {
      os << filename << ", failure (unsolvable), " << goal_tests << ", " << max_queue_size << ", " << num_stacks << ", " << num_blocks << ", NA" ;
    }
  }

  if (screen_output) {
    cout << filename << endl;
    if (success) {
      cout << "success! iter=" << iter << ", depth=" << node.depth() << ", num_goal_tests=" << goal_tests << ", max_queue_size=" << max_queue_size << endl;
      node.print_path();
    }
    else {
      os << "FAILURE - ";
      if (iter == max_iterations) {
        cout << "took too long...\n";
      }
      else {
        cout << "problem is not solvable...\n";
      }
    }
  }
}


void a_star(Node begin, Node end, int num_stacks, int num_blocks, string filename, bool screen_output, ofstream& os) {
  int iter=0, goal_tests=0, max_queue_size=0;

  Node node = begin;

  // base case; if the start node is the goal
  if (node.goal_test(&end.state)) {
    goal_tests++;
    print_results(node, iter, goal_tests, max_queue_size, num_stacks, num_blocks, true, filename, screen_output, os);
    return;
  }
  goal_tests++;

  auto greater_f = [](Node a, Node b) {return a.f > b.f;};

  priority_queue<Node, vector<Node>, decltype(greater_f)> frontier(greater_f);
  unordered_map<string, Node> reached;
  frontier.push(node);
  max_queue_size++;

  // while we have nodes to explore and not too many iterations
  while (!frontier.empty() && iter < max_iterations) {
    node = frontier.top();
    frontier.pop();
    reached[node.hash()] = node;

    if (node.goal_test(&end.state)) {
      goal_tests++;
      print_results(node, iter, goal_tests, max_queue_size, num_stacks, num_blocks, true, filename, screen_output, os);
      return;
    }
    goal_tests++;

    // create deep copy of node
    Node* parent = new Node(node.state, node.parent);

    iter++;
    // if (iter % 10000 == 0) {
    //   os << "iter=" << iter << " agenda_size=" << frontier.size() << " curr_depth=" << parent->depth() << endl;
    // }

    // iterate through node successors
    vector<State> successors = node.successors();
    for (int i = 0; i < successors.size(); i++) {
      Node child_node(successors[i], parent);

      // if child_node isn't in reached
      if (reached.find(child_node.hash()) == reached.end()) {
        child_node.g = node.g + 1;
        child_node.h = child_node.state.heuristic(end.state, num_blocks);
        child_node.f = child_node.g + child_node.h;

        // check if child node is already in frontier
        priority_queue<Node, vector<Node>, decltype(greater_f)> frontier_copy(greater_f);
        Node child_node_in_frontier;
        bool child_node_found = false;
        while (!frontier_copy.empty()) {
          Node possible_match = frontier_copy.top();
          if (possible_match.hash() == child_node.hash()) {
            child_node_in_frontier = frontier_copy.top();
            child_node_found = true;
            break;
          }
          frontier_copy.pop();
        }

        if (child_node_found && child_node_in_frontier.g > child_node.g) {
          continue;
        }
        frontier.push(child_node);

        if (frontier.size() > max_queue_size) {
          max_queue_size = frontier.size();
        }
      }
    }
  }

  // failure
  print_results(fail_node, iter, goal_tests, max_queue_size, num_stacks, num_blocks, false, filename, screen_output, os);
}

#endif
