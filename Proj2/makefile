BlocksworldAstar: BlocksworldAstar.cpp Node.o State.o
	g++ -g BlocksworldAstar.cpp Node.o State.o -o BlocksworldAstar

Node.o: Node.h

State.o: State.h

run_tests:
	./run_tests.sh

clean:
	rm -rf BlocksworldAstar *.o RESULTS.csv
