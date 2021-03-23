#include <iostream>
#include <vector>
#include <fstream>
#include "Node.h"
#include "State.h"

// using namespace std;

  Node::Node() {}

  // maybe dont initialize to 0
  Node::Node(State _state) {
    state = _state;
    parent = nullptr;
    g = 0;
    h = 0;
    f = 0;
  }

  Node::Node(State _state, Node* _parent) {
    state = _state;
    parent = _parent;
    g = 0;
    h = 0;
    f = 0;
  }

  Node::Node(State _state, Node* _parent, int _g, int _h) {
    state = _state;
    parent = _parent;
    g = _g;
    h = _h;
    f = _g + _h;
  }

  void Node::print() {
    state.print();
  }

  int Node::depth() {
    // iterate through parents and count how many there are
    int depth = 0;
    Node* p = parent;
    while (p != nullptr) {
      p = p->parent;
      depth++;
    }

    return depth;
  }

  void Node::print_path() {
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
      cout << "move " << i << endl;
      reversed_path[i]->print();
      cout << ">>>>>>>>>>\n";
    }
    // print this node
    cout << "move " << depth << endl;
    print();
    cout << ">>>>>>>>>>\n";
  }

  string Node::hash() {
    return state.hash();
  }

  bool Node::goal_test(State* state_to_check) {
    return state.match(state_to_check);
  }

  vector<State> Node::successors() {
    return state.successors();
  }
