package server

import (
	"net/http"
)

// Serves all files in ./client
func SetupFileServer() {
	http.Handle("/", http.FileServer(http.Dir("./client/")))
}
