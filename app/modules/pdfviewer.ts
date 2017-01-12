import {WindowHelper} from './windowhelper';
import * as path from 'path';

class PdfViewer {
  static openViewer(fileUrl: string) {
    WindowHelper.openWindowFile(`file=${fileUrl}`)
  }
}
