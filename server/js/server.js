var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:9000"});
  response.write('[{"id": "1", "name": "test1", "code": "jsfnfkdnfl", "issues": [{"id": "11", "projectId": "1", "name": "bug1", "detail": "Everything is very bad"}, {"id":"12", "projectId": "1", "name": "bug2", "detail": "Everything doesn\'t work"}]}, {"id": "2", "name": "test2", "code": "dklkfmjlkfd", "issues": [{"id": "21", "projectId": "2", "name":"bug1", "detail": "Everything is very bad"}, {"id": "22", "projectId": "2", "name": "bug2", "detail": "Everything doesn\'t work"}]}, {"id": "3", "name": "test3", "code": "dlkflkdjlkfj", "issues": [{"id": "31", "projectId": "3", "name": "bug1", "detail": "Everything is very bad"}, {"id": "32", "projectId": "3", "name": "bug2", "detail": "Everything doesn\'t work"}]}]');
  response.end();
}).listen(8888);