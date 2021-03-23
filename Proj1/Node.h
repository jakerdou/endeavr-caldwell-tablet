#ifndef NODE_H
#define NODE_H

#include <iostream>
#include <vector>
#include <fstream>
#include "State.h"

// using namespace std;

class Node {
  public:
    State state;
    Node* parent;

    Node() {}

    Node(State _state) {
      state = _state;
      parent = nullptr;
    }

    Node(State _state, Node* _parent) {
      state = _state;
      parent = _parent;
    }

    void print(ofstream& os) {
      state.print(os);
    }

    int depth() {
      // iterate through parents and count how many there are
      int depth = 0;
      Node* p = parent;
      while (p != nullptr) {
        p = p->parent;
        depth++;
      }

      return depth;
    }

    void print_path(ofstream& os) {
      // iterate through parents and insert them in a vector to reverse their order
      vector<Node*> reversed_path;
      int depth = 0;
      Node* p = parent;
      while (p != nullptr) {
        reversed_path.insert(reversed_path.begin(), p);
        p = p->parent;
        depth++;
      }

      // print moves up until this node
      for (int i = 0; i < reversed_path.size(); i++) {
        os << "move " << i << endl;
        reversed_path[i]->print(os);
        os << ">>>>>>>>>>\n";
      }
      // print this node
      os << "move " << depth << endl;
      print(os);
      os << ">>>>>>>>>>\n";
    }

    string hash() {
      return state.hash();
    }

    bool goal_test(State* state_to_check) {
      return state.match(state_to_check);
    }

    vector<State> successors() {
      return state.successors();
    }
};

#endif
