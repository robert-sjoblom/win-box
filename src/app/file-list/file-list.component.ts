import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {


  files = [
    {
      '.tag': 'folder',
      'name': 'Hello',
      'path_lower': '/hello',
      'path_display': '/hello',
      'id': 'id:UVzVjcI1eGAAAAAAAAAACw'
    },
    {
      '.tag': 'folder',
      'name': 'Angular',
      'path_lower': '/angular',
      'path_display': '/Angular',
      'id': 'id:UVzVjcI1eGAAAAAAAAAADA'
    },
    {
      '.tag': 'folder',
      'name': 'React',
      'path_lower': '/react',
      'path_display': '/React',
      'id': 'id:UVzVjcI1eGAAAAAAAAAADQ'
    },
    {
      '.tag': 'file',
      'name': 'Kom igång med Dropbox Paper.url',
      'path_lower': '/kom igång med dropbox paper.url',
      'path_display': '/Kom igång med Dropbox Paper.url',
      'id': 'id:UVzVjcI1eGAAAAAAAAAABw',
      'client_modified': '2018-05-16T11:18:41Z',
      'server_modified': '2018-05-16T11:18:41Z',
      'rev': '1ba4cdbd0',
      'size': 240,
      'content_hash': 'f40c1228343d7e2a632281c986dbb7af3491b9b63ddfd0eb10fee2c913f6cfa7'
    },
    {
      '.tag': 'file',
      'name': 'Kom igång med Dropbox.pdf',
      'path_lower': '/kom igång med dropbox.pdf',
      'path_display': '/Kom igång med Dropbox.pdf',
      'id': 'id:UVzVjcI1eGAAAAAAAAAABg',
      'client_modified': '2018-05-16T11:18:41Z',
      'server_modified': '2018-05-16T11:18:41Z',
      'rev': '2ba4cdbd0',
      'size': 1114772,
      'content_hash': 'b8cda2b6483bc7c8da34cb91b9ed1fe6a56d04b8453bd703867b108d3cf6eaac'
    },
    {
      '.tag': 'file',
      'name': '41-726x940.jpg',
      'path_lower': '/41-726x940.jpg',
      'path_display': '/41-726x940.jpg',
      'id': 'id:UVzVjcI1eGAAAAAAAAAACg',
      'client_modified': '2018-05-17T12:25:14Z',
      'server_modified': '2018-05-17T12:25:15Z',
      'rev': '3ba4cdbd0',
      'size': 139230,
      'content_hash': '0a990f8f9afeb1dd6b86de9f2629762a8183b4d98a3cc6656b681f2e82e95984'
    },
    {
      '.tag': 'file',
      'name': 'fullsizeoutput_1.jpeg',
      'path_lower': '/fullsizeoutput_1.jpeg',
      'path_display': '/fullsizeoutput_1.jpeg',
      'id': 'id:UVzVjcI1eGAAAAAAAAAADg',
      'client_modified': '2018-05-17T12:26:37Z',
      'server_modified': '2018-05-17T12:26:37Z',
      'rev': '7ba4cdbd0',
      'size': 25452,
      'content_hash': 'ccbac32e058bb1f686f5f895a8f47393bcabcf06975d63a64356f7641a470786'
    }
  ];


  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getCurrentLocationContent('');
  }

  // changePath(event) {
  //   this.stateService.changePath(event.path_lower, event['.tag']);
  // }

}
