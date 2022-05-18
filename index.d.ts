interface Service {
  id: string;
  name: string;
  status: import("./src/ts/status").Status;
}

interface ResponseContainer {
  name: string;
  status: string;
}

interface StatusResponse {
  containers: ResponseContainer[];
  time: Number;
}