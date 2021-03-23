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
    int g, h, f;

    Node();

    // maybe dont initialize to 0
    Node(State _state);

    Node(State _state, Node* _parent);

    Node(State _state, Node* _parent, int _g, int _h);

    void print();

    int depth();

    void print_path();

    string hash();

    bool goal_test(State* state_to_check);

    vector<State> successors();
};

#endif
