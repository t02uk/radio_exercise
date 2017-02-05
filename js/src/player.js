export default class Player {

  constructor(dom, onComplete) {
    this.dom = dom;
    this.onComplete = onComplete;
  }

  inject() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () =>{
      let endedCount = 0;
      const player = new YT.Player(this.dom, {

        videoId: '_YZZfaMGEOU',     // ラジオ体操第一
        events: {
          'onStateChange': (event) => {
            if (event.data == YT.PlayerState.ENDED) {
              endedCount++;
              if (endedCount === 2) {
                if (this.onComplete) {
                  this.onComplete();
                }
              }
            }
          }
        },
        playerVars: {
          playlist: 'yi1TbzML2cU'   // ラジオ体操第二
        }
      });
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }

}