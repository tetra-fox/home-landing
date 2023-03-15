interface Container {
  id: string;
  name: string;
  names: string[];
  state: string;
  status: string;
  image: string;
  image_hash: string;
}

interface StatusResponse {
  containers: Container[];
  time: number;
}

interface WeightedItem {
  value: unknown;
  weight: number;
}
