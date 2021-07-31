import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const GITLAB_ACCESS_TOKEN = 'WYpyWHe3hL919K_Wh-zi';
const GITLAB_AVC_STORAGE_ID = '27318230';
const GITLAB_URL = `https://gitlab.com/api/v4/projects/${GITLAB_AVC_STORAGE_ID}`;
const headers = { 'PRIVATE-TOKEN': GITLAB_ACCESS_TOKEN };

@Injectable()
export class GitlabApiService {
  constructor(private http: HttpClient) {}

  getLatestPipelineIdByModelId(id: number) {
    return this.http
      .get<[{ id: number }]>(`${GITLAB_URL}/pipelines?per_page=1&ref=${id}`, { headers })
      .pipe(map(([{ id }]) => id));
  }
  getJobIdByPipelineId(pipelineId: number) {
    const scopes = ['success', 'running', 'failed'];
    const scopesQueryParams = scopes.map((scope) => `&scope[]=${scope}`).join('');
    return this.http
      .get<[{ id: number; stage: string }]>(
        `${GITLAB_URL}/pipelines/${pipelineId}/jobs?per_page=2${scopesQueryParams}`,
        { headers }
      )
      .pipe(map((jobs) => jobs.find((job) => job.stage === 'train')?.id));
  }

  getLogByJobId(jobId: number) {
    return this.http.get<string>(`${GITLAB_URL}/jobs/${jobId}/trace`, {
      headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' },
      responseType: 'text' as 'json' // lie typescript check
    });
  }
  getDatasetZipByModelId(modelId: number) {
    return this.http.get<{ content: string; size: number; file_name: string; file_path: string }>(
      `${GITLAB_URL}/repository/files/traindata%2Ezip?ref=${modelId}`,
      {
        headers: headers
      }
    );
  }
}

/**
 * Method is use to download file.
 * @param data - Array Buffer data
 * @param type - type of the document.
 */
function downLoadFile(data: ArrayBuffer, type: string) {
  const blob = new Blob([data], { type: type });
  const url = window.URL.createObjectURL(blob);
  const pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    alert('Please disable your Pop-up blocker and try again.');
  }
}

// const b64toBlob = (base64, type = 'application/octet-stream') =>
//   fetch(`data:${type};base64,${base64}`).then(res => res.blob())
