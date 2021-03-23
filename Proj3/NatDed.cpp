#include "NatDed.hpp"

Expr* ModusPonens(Expr* conditional, Expr* antecedent) {
  try {
    if (Eq(conditional->sub[1], antecedent)) {
      Expr* consequent = new Expr(conditional->sub[2]);
      return consequent;
    }
    throw(RuleApplicationError("the antecedent must be equal to the first argument in the conditional"));

  }
  catch(RuleApplicationError err) {
    cout << err.what() << endl;
  }

  Expr* expr_ptr;
  return expr_ptr;
}

Expr* OrElimination(Expr* disjunction, Expr* to_eliminate) {
  try {
    if (disjunction->sub[0]->toString() != "or") {
      throw(RuleApplicationError("a disjunction must be passed in"));
    }

    if (Eq(disjunction->sub[1], to_eliminate->sub[1])) {
      return new Expr(disjunction->sub[2]);
    }
    if (Eq(disjunction->sub[2], to_eliminate->sub[1])) {
      return new Expr(disjunction->sub[1]);
    }
    throw(RuleApplicationError("you must be able to eliminate an argument from the disjunction passed in"));
  }
  catch(RuleApplicationError err) {
    cout << err.what() << endl;
  }
}

Expr* AndElimination(Expr* conjunction, Expr* to_eliminate) {
  try {
    if (conjunction->sub[0]->toString() != "and") {
      throw(RuleApplicationError("a conjunction must be passed in"));
    }

    if (Eq(conjunction->sub[1], to_eliminate)) {
      return new Expr(conjunction->sub[2]);
    }
    if (Eq(conjunction->sub[2], to_eliminate)){
      return new Expr(conjunction->sub[1]);
    }
    throw(RuleApplicationError("you must be able to eliminate an argument from the conjunction passed in"));
  }
  catch(RuleApplicationError err) {
    cout << err.what() << endl;
  }
}

Expr* DoubleNegationElimination(Expr* sent) {

  try {
    if (sent->sub[0]->toString() == "not" && sent->sub[1]->sub[0]->toString() == "not") {
      return sent->sub[1]->sub[1];
    }
    throw(RuleApplicationError("you must pass in a sentence with a double negative"));
  }
  catch(RuleApplicationError err) {
    cout << err.what() << endl;
  }
}

Expr* AndIntroduction(Expr* s1, Expr* s2) {
  Expr* _and = parse("and");
  vector<Expr*> exprs = {s1, _and, s2};
  Expr* and_intro = new Expr(exprs);
  return and_intro;
}

Expr* OrIntroduction(Expr* s1, Expr* s2) {
  Expr* _and = parse("or");
  vector<Expr*> exprs = {s1, _and, s2};
  Expr* and_intro = new Expr(exprs);
  return and_intro;
}

Expr* Demorgans(Expr* sent, bool and_to_or) {
  Expr* arg1 = sent->sub[1]->sub[1];
  Expr* arg2 = sent->sub[1]->sub[2];
  Expr* _not = parse("not");

  if (and_to_or) {
    Expr* expr = parse("(or (not " + arg1->toString() + ") (not " + arg2->toString() + "))");
    return expr;
  }
  else {
    Expr* expr = parse("(and (not " + arg1->toString() + ") (not " + arg2->toString() + "))");
    return expr;
  }
}
