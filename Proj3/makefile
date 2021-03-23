sammys: sammys.cpp parser.o NatDed.o
	g++ -g sammys.cpp parser.o NatDed.o -o sammys

parser.o: parser.hpp

NatDed.o: NatDed.hpp

clean:
	rm -rf sammys *.o sammys.txt
