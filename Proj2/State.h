#ifndef STATE_H
#define STATE_H

#include <iostream>
#include <vector>
#include <fstream>

using namespace std;

class State {
  public:
    vector<vector<char>> state;

    State();

    State(vector<vector<char>> _state);

    void print();

    string hash();

    bool match(State* state_to_check);

    vector<State> successors();

    int heuristic(State end, int num_blocks);
};

#endif
