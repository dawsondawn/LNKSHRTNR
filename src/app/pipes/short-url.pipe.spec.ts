import { ApiService } from '../services/api.service';
import { LinkService } from '../services/link.service';
import { ShortUrlPipe } from './short-url.pipe';

xdescribe('ShortUrlPipe', () => {
  it('create an instance', () => {
    let link:LinkService
    const pipe = new ShortUrlPipe(link);
    expect(pipe).toBeTruthy();
  });
});
