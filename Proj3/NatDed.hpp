#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
#include <unordered_map>
#include "stdio.h"
#include "parser.hpp"

#ifndef NATDED_H
#define NATDED_H

Expr* ModusPonens(Expr* conditional, Expr* antecedent);

Expr* OrElimination(Expr* disjunction, Expr* to_eliminate);

Expr* AndElimination(Expr* conjunction, Expr* to_eliminate);

Expr* DoubleNegationElimination(Expr* sent);

Expr* AndIntroduction(Expr* s1, Expr* s2);

Expr* OrIntroduction(Expr* s1, Expr* s2);

Expr* Demorgans(Expr* sent, bool and_to_or);

#endif
