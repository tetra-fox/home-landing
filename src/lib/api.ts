type Container = {
  id: string;
  name: string;
  names: string[];
  state: string;
  status: string;
  image: string;
  image_hash: string;
};

type StatusResponse = {
  containers: Container[];
  time: number;
};

export default {
  async get(containers: string[] = []): Promise<StatusResponse> {
    const res: Response = await fetch(`https://home.tetra.cool/api/${containers.join(",")}`);
    if (res.status !== 200) throw new Error("Failed to get status");

    return await res.json();
  }
};
