package server

import (
	"net/http"
)

func SetupFileServer() {
	http.Handle("/", http.FileServer(http.Dir("./client/")))
}
