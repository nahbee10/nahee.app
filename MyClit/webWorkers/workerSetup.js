export default class WebWorker {
  constructor(orgasmWorker) {
    const code = orgasmWorker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    return new Worker(URL.createObjectURL(blob));
  }
}