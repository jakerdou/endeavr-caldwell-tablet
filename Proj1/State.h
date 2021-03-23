#ifndef STATE_H
#define STATE_H

#include <iostream>
#include <vector>
#include <fstream>

using namespace std;

class State {
  public:
    vector<vector<char>> state;

    State() {}

    State(vector<vector<char>> _state) {
        state = _state;
    }

    void print(ofstream& os) {
      // iterate through vectors in state and print out blocks
      vector<vector<char>>::iterator row;
      vector<char>::iterator block;
      for (row = state.begin(); row != state.end(); row++) {
        for (block = row->begin(); block != row->end(); block++) {
          os << *block;

        }
        os << endl;
      }
    }

    string hash() {
      // iterate through vectors in state and create hash
      string hash;
      vector<vector<char>>::iterator row;
      vector<char>::iterator block;
      for (row = state.begin(); row != state.end(); row++) {
        for (block = row->begin(); block != row->end(); block++) {
          // make sure character isn't a newline
          if (isalnum(*block)) {
              hash += *block;
          }
        }
        // '-' indicates the end of a stack
        hash += "-";
      }
      return hash;
    }

    bool match(State* state_to_check) {
      // check if hashes match
      if (hash() == state_to_check->hash()) {
        return true;
      }
      else {
        return false;
      }
    }

    vector<State> successors() {
      vector<State> successors;

      // iterate through vectors in state and create new states corresponding to successors
      for (int i = 0; i < state.size(); i++) {
        if (state[i].size() > 0) {
          for (int j = 0; j < state.size(); j++) {
            // if i and j don't point to the same row
            if (i != j) {
              State successor(state);
              int top_block_index = successor.state[i].size() - 1;
              char top_block = successor.state[i][top_block_index];

              successor.state[i].pop_back();
              successor.state[j].push_back(top_block);

              successors.push_back(successor);
            }
          }
        }
      }
      return successors;
    }
};

#endif
