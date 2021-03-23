#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
#include <unordered_map>
#include "stdio.h"
#include "NatDed.hpp"

using namespace std;

int main(int argc, char** argv) {
  vector<Expr*> knowledge_base = load_kb(argv[1]);

  ofstream os(argv[2], fstream::out | fstream::app);
  streambuf *coutbuf = cout.rdbuf();
  cout.rdbuf(os.rdbuf());

  Expr* n_c3b = ModusPonens(knowledge_base[8], knowledge_base[32]);
  knowledge_base.push_back(n_c3b);
  Expr* c3y_or_c3b = ModusPonens(knowledge_base[14], knowledge_base[31]);
  knowledge_base.push_back(c3y_or_c3b);
  Expr* c1y_or_c1b = ModusPonens(knowledge_base[10], knowledge_base[27]);
  knowledge_base.push_back(c1y_or_c1b);
  Expr* c2w_or_c2b = ModusPonens(knowledge_base[11], knowledge_base[29]);
  knowledge_base.push_back(c2w_or_c2b);
  Expr* c3y = OrElimination(c3y_or_c3b, n_c3b);
  knowledge_base.push_back(c3y);
  Expr* n_c1y_a_n_c2y = ModusPonens(knowledge_base[23], c3y);
  knowledge_base.push_back(n_c1y_a_n_c2y);
  Expr* n_c1y = AndElimination(n_c1y_a_n_c2y, n_c1y_a_n_c2y->sub[2]);
  knowledge_base.push_back(n_c1y);
  Expr* c1b = OrElimination(c1y_or_c1b, n_c1y);
  knowledge_base.push_back(c1b);
  Expr* n_c2b_a_n_c3b = ModusPonens(knowledge_base[16], c1b);
  knowledge_base.push_back(n_c2b_a_n_c3b);
  Expr* n_c2b = AndElimination(n_c2b_a_n_c3b, n_c2b_a_n_c3b->sub[2]);
  knowledge_base.push_back(n_c2b);
  Expr* c2w = OrElimination(c2w_or_c2b, n_c2b);
  knowledge_base.push_back(c2w);
  show_kb(knowledge_base);

  cout.rdbuf(coutbuf);

  // DoubleNegationElimination Test
  Expr* w_doub_neg = parse("(not (not P))");
  Expr* wo_doub_neg = DoubleNegationElimination(w_doub_neg);
  cout << "DoubleNegationElimination Result: " << wo_doub_neg->toString() << endl;

  // AndIntroduction Test
  Expr* p = parse("P");
  Expr* q = parse("Q");
  Expr* p_a_q = AndIntroduction(p, q);
  cout << "AndIntroduction Result: " << p_a_q->toString() << endl;

  // OrIntroduction Test
  Expr* p_o_q = OrIntroduction(p, q);
  cout << "OrIntroduction Result: " << p_o_q->toString() << endl;

  // Demorgans Test
  Expr* n_o_p_q = parse("(not (or P Q))");
  Expr* a_n_p_n_q = Demorgans(n_o_p_q, false);
  cout << "Demorgans Result: " << a_n_p_n_q->toString() << endl;

  return 0;
}
