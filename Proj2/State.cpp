#include "State.h"
#include <iostream>
#include <vector>
#include <fstream>

using namespace std;

  vector<vector<char>> state;

  State::State() {}

  State::State(vector<vector<char>> _state) {
      state = _state;
  }

  void State::print() {
    // iterate through vectors in state and print out blocks
    vector<vector<char>>::iterator row;
    vector<char>::iterator block;
    for (row = state.begin(); row != state.end(); row++) {
      for (block = row->begin(); block != row->end(); block++) {
        cout << *block;

      }
      cout << endl;
    }
  }

  string State::hash() {
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

  bool State::match(State* state_to_check) {
    // check if hashes match
    if (hash() == state_to_check->hash()) {
      return true;
    }
    else {
      return false;
    }
  }

  vector<State> State::successors() {
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

  int State::heuristic(State end, int num_blocks) {
    vector<vector<char>> end_state = end.state;

    int num_matched = 0;
    for (int row = 0; row < state.size(); row++) {
      for (int block = 0; block < min(state[row].size(), end_state[row].size()); block++) {
        if (state[row][block] == end_state[row][block]) {
          num_matched++;
        }
      }
    }
    return num_blocks - num_matched;

    // heuristic that checks matching blocks of successors; performs worse
    // int num_matched = 0;
    // for (int child = 0; child < successors().size(); child++) {
    //   int num_matched_child = 0;
    //   vector<vector<char>> child_state = successors()[child].state;
    //   for (int row = 0; row < child_state.size(); row++) {
    //     for (int block = 0; block < min(child_state[row].size(), end_state[row].size()); block++) {
    //       if (child_state[row][block] == end_state[row][block]) {
    //         num_matched_child++;
    //       }
    //     }
    //   }
    //   if (num_matched_child > num_matched) {
    //     num_matched = num_matched_child;
    //   }
    // }
    // return num_blocks - num_matched;
  }
