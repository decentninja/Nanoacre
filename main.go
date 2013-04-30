package main

import (
	server "./server"
	"log"
	"net/http"
)

func main() {
	server.SetupSocketServer()
	server.SetupFileServer()
	log.Println("Done setting up, listening...")
	log.Fatal(http.ListenAndServe(":9000", nil))
}
