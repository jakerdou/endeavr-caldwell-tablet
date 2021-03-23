#include "State.h"
#include "Node.h"
#include "Helpers.h"

#include <iostream>
#include <fstream>

using namespace std;

int main(int argc, char** argv) {
  // check to see if correct number of command line arguments were supplied
  if (argc != 3) {
    cout << "Please give an input file and output file as command line arguments...\n";
    return 1;
  }

  string input_filename = argv[1];
  ifstream is(input_filename);
  // check if input file exists
  if (!is.is_open()) {
    cout << "The file " << input_filename << " was not found...\n";
    return 1;
  }

  // get start and goal nodes
  begin_end begin_end_nodes = get_begin_end(is);
  Node begin = begin_end_nodes.begin;
  Node end = begin_end_nodes.end;

  string output_filename = argv[2];
  // open ofstream, if file does not exist, create it
  ofstream os(output_filename, fstream::out | fstream::app);

  os << "################## " << input_filename << " ##################\n";

  // success or failure output is handled in this function
  bfs(begin, end, os);

  os << endl;

  return 0;
}
