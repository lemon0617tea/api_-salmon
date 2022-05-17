export enum Status {
  Created = 'created',
  Updated = 'updated',
}

export class UploadResults {
  constructor(results: UploadResult[]) {
    this.results = results;
  }
  results: UploadResult[];
}

export class UploadResult {
  constructor(salmon_id: number, status: Status) {
    this.salmon_id = salmon_id;
    this.status = status;
  }
  salmon_id: number;
  status: Status;
}
