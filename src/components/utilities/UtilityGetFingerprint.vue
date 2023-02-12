<template>
  <div utility-fingerprint id="utility-fingerprint">
    <div ref='canvasContainer' class="hidden"/>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'PageHome',
  components: {
  },
  data() {
    return {
      fingerprint: {},
      fingerprints: null
    }
  },
  methods: {

    fingerprintLocation(){
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0]
      return tz
    },

    fingerprintDate(){
      let date = new Date()
      date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      return date
    },

    fingerprintTime(){
      let time = new Date()
      let hours = time.getHours().toString().padStart(2, '0')
      let minutes = time.getMinutes().toString().padStart(2, '0')
      let seconds = time.getSeconds().toString().padStart(2, '0')

      time = `${hours}:${minutes}:${seconds}`
      return time
    },

    alphabetPosition(text){
      return text.split('').map(function(character){ return character.charCodeAt(0) - 'a'.charCodeAt(0) + 1; })
    },

    fingerprintToInt(val) {

      let newArr = []
      let string = ""
      for (let el of val) {
         let newEl
         if  (el.toLowerCase() != el.toUpperCase()) {
           newArr.push(this.alphabetPosition(el)[0])
           newEl = this.alphabetPosition(el)[0]
         } else {
           newArr.push(parseInt(el))
           newEl = el
         }

      }
      return newArr

    },

    fingerprintToColors(val) {
      let colors = val.match(/.{6}/g)
      let colors2 = []
      for (let color of colors) {
        colors2.push('#' + color)
      }
      return colors2
    },

    webgl(){
      var canvas, ctx, width = 256, height = 128;
      canvas = this.$refs.canvasContainer.appendChild(document.createElement("canvas"));

      try {
        canvas.width = width
        canvas.height = height
        ctx = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("moz-webgl");
        var f = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
        var g = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
        var h = ctx.createBuffer();

      }
      catch (e) {
        console.log('eeeerror')
        this.$store.commit('setFingerprint', 'error')
        throw new Error('e');
      }


        ctx.bindBuffer(ctx.ARRAY_BUFFER, h);

        var i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]);

        ctx.bufferData(ctx.ARRAY_BUFFER, i, ctx.STATIC_DRAW), h.itemSize = 3, h.numItems = 3;

        var j = ctx.createProgram();
        var k = ctx.createShader(ctx.VERTEX_SHADER);

        ctx.shaderSource(k, f);
        ctx.compileShader(k);

        var l = ctx.createShader(ctx.FRAGMENT_SHADER);

        ctx.shaderSource(l, g);
        ctx.compileShader(l);
        ctx.attachShader(j, k);
        ctx.attachShader(j, l);
        ctx.linkProgram(j);
        ctx.useProgram(j);

        j.vertexPosAttrib = ctx.getAttribLocation(j, "attrVertex");
        j.offsetUniform = ctx.getUniformLocation(j, "uniformOffset");

        ctx.enableVertexAttribArray(j.vertexPosArray);
        ctx.vertexAttribPointer(j.vertexPosAttrib, h.itemSize, ctx.FLOAT, !1, 0, 0);
        ctx.uniform2f(j.offsetUniform, 1, 1);
        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, h.numItems);



      var m = "";

      var n = new Uint8Array(width * height * 4);
      ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, n);
      m = JSON.stringify(n).replace(/,?"[0-9]+":/g, "");

      var sha256 = (function(){

        // Eratosthenes seive to find primes up to 311 for magic constants. This is why SHA256 is better than SHA1
        var i = 1,
            j,
            K = [],
            H = [];

        while(++i < 18){
          for(j = i * i; j < 312; j += i){
            K[j] = 1;
          }
        }

        function x(num, root){
          return (Math.pow(num, 1 / root) % 1) * 4294967296|0;
        }

        for(i = 1, j = 0; i < 313; ){
          if(!K[++i]){
            H[j] = x(i,2);
            K[j++] = x(i,3);
          }
        }

        function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }

        function SHA256(b){
          var HASH = H.slice(i = 0),
              s = unescape(encodeURI(b)), /* encode as utf8 */
              W = [],
              l = s.length,
              m = [],
              a, y, z;
          for(; i < l; ) m[i >> 2] |= (s.charCodeAt(i) & 0xff) << 8 * (3 - i++ % 4);

          l *= 8;

          m[l >> 5] |= 0x80 << (24 - l % 32);
          m[z = (l + 64 >> 5) | 15] = l;

          for(i = 0; i < z; i += 16){
            a = HASH.slice(j = 0, 8);

            for(; j < 64; a[4] += y){
              if(j < 16){
                W[j] = m[j + i];
              }else{
                W[j] =
                  (S(y = W[j - 2], 17) ^ S(y, 19) ^ (y >>> 10)) +
                  (W[j - 7]|0) +
                  (S(y = W[j - 15], 7) ^ S(y, 18) ^ (y >>> 3)) +
                  (W[j - 16]|0);
              }

              a.unshift(
                (
                  y = (
                    a.pop() +
                    (S(b = a[4], 6) ^ S(b, 11) ^ S(b, 25)) +
                    (((b & a[5]) ^ ((~b) & a[6])) + K[j])|0
                  ) +
                  (W[j++]|0)
                ) +
                (S(l = a[0], 2) ^ S(l, 13) ^ S(l, 22)) +
                ((l & a[1]) ^ (a[1] & a[2]) ^ (a[2] & l))
              );
            }

            for(j = 8; j--; ) HASH[j] = a[j] + HASH[j];
          }

          for(s = ''; j < 63; ) s += ((HASH[++j >> 3] >> 4 * (7 - j % 8)) & 15).toString(16);

          return s;
        }
          return SHA256;
      })();
      const fingerprint = sha256(m)
      //TODO: key : value pairs
      this.fingerprint.string = fingerprint

      if(this.fingerprints.some(fingerprint => fingerprint.string == this.fingerprint.string)) {
        console.log('yeyy')
        this.fingerprint =  this.fingerprints.find(o => o.string === this.fingerprint.string)
      } else {
        this.fingerprint.int = this.fingerprintToInt(fingerprint)
        this.fingerprint.hex = this.fingerprintToColors(fingerprint)
        this.fingerprint.date = this.fingerprintDate()
        this.fingerprint.location = this.fingerprintLocation()
        this.fingerprint.time = this.fingerprintTime()
      }
      this.$store.commit('setFingerprint', this.fingerprint)


    }
  },
  watch: {
    fingerprints: {
      immediate: true,
      handler(val) {
        if (val !== null) {
          this.$store.commit('setFingerprints', this.fingerprints)
          this.webgl()
        }
      },
    },
  },
  mounted() {
    const baseUrl = process.env.BASE_URL;
    axios.get('fingerprints.json')
     .then(res => console.log(this.fingerprints = res.data))
     .catch(err => console.log(err))
    // if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    //     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    //     return
    // } else {
    //   this.webgl()
    // }

  }
}
</script>


<style lang="scss">



</style>
