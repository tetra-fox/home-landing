interface Service {
  id: string;
  name: string;
  status: import("./src/ts/status").Status;
}

interface StatusResponse {
  containers: {name: string; status: string}[];
  time: number;
}
