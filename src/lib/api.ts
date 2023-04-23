export default {
  async get(containers: string[] = []): Promise<StatusResponse> {
    const res: Response = await fetch(`https://dtw.tetra.cool/api/${containers.join(",")}`);
    if (res.status !== 200) throw new Error("Failed to get status");

    return await res.json();
  }
};
