import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  @Output() fileUploaded = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  upload(event: any): void {
    const fileList: FileList = event.target.files;
    const file = fileList.item(0);
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    this.http.post(`${environment.api}/upload`, data).subscribe((res: any) => {
      this.fileUploaded.emit(res.url);
    });

  }

}
