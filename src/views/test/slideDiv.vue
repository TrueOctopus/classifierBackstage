<template>
  <div ref="box" class="box">
    <div ref="left" class="left">
      <!--左侧div内容-->
      <slot name="left" />
    </div>
    <div v-show="show" class="resize" title="收缩侧边栏">
      <div>⋮</div>
    </div>
    <div v-show="show" ref="right" class="right">
      <!--右侧div内容-->
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SlideDiv',
  components: {},
  props: {
    leftMinWidth: { // Number 左侧滑动块最小宽度   单位px
      type: Number,
      default: 200
    },
    rightMinWidth: { // Number 右侧滑动块最小宽度   单位px
      type: Number,
      default: 200
    },
    show: { // 是否显示两个滑块
      type: Boolean,
      default: true
    },
    leftWidth: { // 显示两个滑块时，左侧默认大小
      type: String,
      default: '60%'
    },
    rightWidth: { // 显示两个滑块时，右侧默认大小
      type: String,
      default: '40%'
    }
  },
  data() {
    return {
    }
  },
  created() {},
  mounted() {
    this.dragControllerDiv()
    this.init()
  },
  methods: {
    init() {
      if (this.show) {
        this.$refs.left.style.width = this.leftWidth
        this.$refs.right.style.width = this.rightWidth
      } else {
        console.log('asdf')
        this.$refs.left.style.width = '100%'
      }
    },
    dragControllerDiv: function() {
      var _this = this
      var resize = document.querySelector('.resize div')
      var left = document.querySelector('.left')
      var right = document.querySelector('.right')
      var box = document.querySelector('.box')
      // 鼠标按下事件
      resize.onmousedown = function(e) {
        // 颜色改变提醒
        resize.style.background = '#818181'
        var startX = e.clientX
        resize.left = resize.offsetLeft
        // 鼠标拖动事件
        document.onmousemove = function(e) {
          var endX = e.clientX
          var moveLen = resize.left + (endX - startX) // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
          var maxT = box.clientWidth - resize.offsetWidth // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
          if (moveLen < _this.leftMinWidth) moveLen = _this.leftMinWidth // 左边区域的最小宽度为32px
          if (moveLen > maxT - _this.rightMinWidth) { moveLen = maxT - _this.rightMinWidth } // 右边区域最小宽度为150px
          resize.style.left = moveLen // 设置左侧区域的宽度
          left.style.width = moveLen + 'px'
          right.style.width = box.clientWidth - moveLen - 10 + 'px'
        }
        // 鼠标松开事件
        document.onmouseup = function(evt) {
          // 颜色恢复
          resize.style.background = '#d6d6d6'
          document.onmousemove = null
          document.onmouseup = null
          resize.releaseCapture && resize.releaseCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        }
        resize.setCapture && resize.setCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* 拖拽相关样式 */
/*包围div样式*/
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
/*左侧div样式*/
.left {
  width: calc(70% - 10px); /*左侧初始化宽度*/
  height: 100%;
  background: #ffffff;
}
/*拖拽区div样式*/
.resize {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 10px;
  div {
    cursor: col-resize;
    background-color: #d6d6d6;
    border-radius: 5px;
    height: 50px;
    font-size: 32px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}
/*右侧div'样式*/
.right {
  width: 30%; /*右侧初始化宽度*/
  height: 100%;
  background: #fff;
}
</style>
