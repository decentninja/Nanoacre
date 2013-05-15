package server

import (
	"log"
	"net/http"
)

// Serves all files in ./client
func SetupFileServer() {
	http.HandleFunc("/log", func(w http.ResponseWriter, r *http.Request) {
		if r.ParseForm() == nil {
			return
		}
		log.Printf("Log: %q", r.Form.Get("msg"))
	})
	http.Handle("/", http.FileServer(http.Dir("./client/")))
}
