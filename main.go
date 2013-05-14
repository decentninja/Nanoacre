package main

import (
	server "./server"
	"log"
	"net/http"
	"os"
)

// Start everything
// Optional argument to force a given field
// ex: go run main.go .sample1
func main() {
	if len(os.Args) > 1 {
		server.SetupSocketServer(os.Args[1])
	} else {
		server.SetupSocketServer("")
	}
	server.SetupFileServer()
	log.Println("Done setting up, listening...")
	log.Fatal(http.ListenAndServe(":9000", nil))
}
