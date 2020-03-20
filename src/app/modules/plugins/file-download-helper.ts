import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';

export class FileDownloadHelper {

  /**
 * Saves a file by opening file-save-as dialog in the browser
 * using file-save library.
 * @param blobContent file content as a Blob
 * @param fileName name file should be saved as
 */
  static saveFile(blobContent: Blob, fileName: string) {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  /**
  * Derives file name from the http response
  * by looking inside content-disposition
  * @param res http Response
  */
  static getFileNameFromResponseContentDisposition(res: HttpResponse<any>) {
    const contentDisposition = res.headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    const fileName = (matches[1] || 'untitled').trim();
    return fileName;
  };
}
