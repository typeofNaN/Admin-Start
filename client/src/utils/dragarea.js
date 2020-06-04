(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory()
  } else {
    root['dragarea'] = factory()
  }
}(this, function () {
  var getEle = function (str) {
    return document.getElementById(str)
  }

  var getCss = function (o, key) {
    return o.currentStyle ? o.currentStyle[key] : window.getComputedStyle(o, null)[key]
  }

  function getScroll (scrollProp, offsetProp) {
    if (typeof global[offsetProp] !== 'undefined') {
      return global[offsetProp]
    }
    if (document.documentElement.clientHeight) {
      return document.documentElement[scrollProp]
    }
    return document.body[scrollProp]
  }

  var getOffset = function (el) {
    var rect = el.getBoundingClientRect()
    return {
      left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
      top: rect.top + getScroll('scrollTop', 'pageYOffset'),
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }
  }

  var dragarea = {

    init: function (opt) {
      var container = getEle(opt.container)
      var cropBox = opt.cropBox ? getEle(opt.cropBox) : null
      var moveAdd = opt.hasOwnProperty('moveAdd') ? opt.moveAdd : true

      var start = null
      var flag = false
      var addHotFlag = false
      var dragPointFlag = false
      var dragAreaFlag = false

      var currentHotBox = null
      var newHotBox = null

      if (!container) {
        console.warn('container null')
        return
      }

      // 先清空上一次的区域
      var childs = container.childNodes
      // 从0到length会删不全
      if (cropBox && childs.length) {
        for (let i = childs.length - 1; i >= 0; i--) {
          childs[i].classList.contains('crop-box') && childs[i].parentNode.removeChild(childs[i])
        }
      }

      if (opt.initareas && opt.initareas.length) {
        for (let i = 0; i < opt.initareas.length; i++) {
          // 创建一个新热区
          var box = cropBox.cloneNode(true)
          box.id = 'cropBox-' + i
          box.dataset.index = i
          i === 0 && box.classList.add('active')
          i > 0 && box.classList.remove('active')
          box.style.width = opt.initareas[i].w + 'px'
          box.style.height = opt.initareas[i].h + 'px'
          box.style.left = opt.initareas[i].x + 'px'
          box.style.top = opt.initareas[i].y + 'px'
          box.style.display = 'block'
          if (opt.initareas[i].text) {
            box.querySelector('.crop-box-tips').textContent = opt.initareas[i].text
          }
          container.appendChild(box)
        }
      }

      container.addEventListener('mousedown', function (e) {
        e.stopImmediatePropagation()
        // 获取可拖动范围
        var usearea = getOffset(container)
        // 记录鼠标开始位置
        start = {
          x: e.clientX,
          y: e.clientY
        }

        // 标记本次鼠标按下
        flag = true

        // 当前触发对象
        var target = e.target

        // 禁止选择事件
        document.onselectstart = function () {
          return false
        }
        // 禁止拖动
        container.ondragstart = function () {
          return false
        }

        // 拖动新建热区
        if (target.classList.contains('area-img') && moveAdd) {
          // 鼠标在容器内的相对位置
          var relativePosition = {
            x: start.x - parseInt(usearea.left),
            y: start.y - parseInt(usearea.top)
          }

          // 创建一个新热区
          var boxs = container.childNodes
          var boxIdx = 0
          if (boxs.length > 1) {
            boxIdx = parseInt(boxs[boxs.length - 1].dataset.index) + 1
          }
          newHotBox = cropBox.cloneNode(true)
          newHotBox.id = 'cropBox-' + boxIdx
          newHotBox.dataset.index = boxIdx
          newHotBox.style.width = '0px'
          newHotBox.style.height = '0px'
          newHotBox.style.left = relativePosition.x + 'px'
          newHotBox.style.top = relativePosition.y + 'px'
          // 在确定用户拖动前隐藏，避免点击出现热区
          newHotBox.style.display = 'none'
          target.parentNode.appendChild(newHotBox)

          document.onmousemove = function (e) {
            if (flag) {
              // 新增热区标签
              addHotFlag = true
              // 显示热区
              newHotBox.style.display = 'block'
              // 实际移动距离
              var move = {
                x: e.clientX - start.x,
                y: e.clientY - start.y
              }

              // 向左上移动
              if (move.x < 0 && move.y <= 0) {
                // 限制不能超过容器
                let limit = {
                  x: e.clientX < usearea.left ? usearea.left : e.clientX,
                  y: e.clientY < usearea.top ? usearea.top : e.clientY
                }
                // 应该移动距离
                let distance = {
                  x: limit.x - start.x,
                  y: limit.y - start.y
                }
                // 随鼠标移动位置并放大
                newHotBox.style.left = relativePosition.x - Math.abs(distance.x) + 'px'
                newHotBox.style.top = relativePosition.y - Math.abs(distance.y) + 'px'
                newHotBox.style.width = Math.abs(distance.x) + 'px'
                newHotBox.style.height = Math.abs(distance.y) + 'px'
              } else if (move.x < 0 && move.y > 0) {
                // 向左下移动
                // 限制不能超过容器
                let limit = {
                  x: e.clientX < usearea.left ? usearea.left : e.clientX,
                  y: e.clientY > usearea.top + usearea.height ? usearea.top + usearea.height : e.clientY
                }
                // 应该移动距离
                let distance = {
                  x: limit.x - start.x,
                  y: limit.y - start.y
                }
                // 随鼠标移动位置并放大
                newHotBox.style.left = relativePosition.x - Math.abs(move.x) > 0 ? relativePosition.x - Math.abs(move.x) + 'px' : '0px'
                newHotBox.style.width = Math.abs(distance.x) + 'px'
                newHotBox.style.height = Math.abs(distance.y) + 'px'
              } else if (move.x >= 0 && move.y < 0) {
                // 向右上移动
                // 限制不能超过容器
                let limit = {
                  x: e.clientX > usearea.left + usearea.width ? usearea.left + usearea.width : e.clientX,
                  y: e.clientY < usearea.top ? usearea.top : e.clientY
                }
                // 应该移动距离
                let distance = {
                  x: limit.x - start.x,
                  y: limit.y - start.y
                }
                // 随鼠标移动位置并放大
                newHotBox.style.top = relativePosition.y - Math.abs(move.y) > 0 ? relativePosition.y - Math.abs(move.y) + 'px' : '0px'
                newHotBox.style.width = Math.abs(distance.x) + 'px'
                newHotBox.style.height = Math.abs(distance.y) + 'px'
              } else if (move.x > 0 && move.y > 0) {
                // 向右下移动
                // 限制不能超过容器
                let limit = {
                  x: e.clientX > usearea.left + usearea.width ? usearea.left + usearea.width : e.clientX,
                  y: e.clientY > usearea.top + usearea.height ? usearea.top + usearea.height : e.clientY
                }
                // 随鼠标放大
                newHotBox.style.width = limit.x - start.x + 'px'
                newHotBox.style.height = limit.y - start.y + 'px'
              }
            }
          }
        }

        var drag = null
        var parent = target.parentNode
        // 获取标记的拖动元素
        if (target.classList.contains('crop-box-content')) {
          drag = target
        }
        while (parent && drag == null) {
          if (parent.classList && parent.classList.contains('crop-box-content')) {
            drag = parent
          } else {
            parent = parent.parentNode
          }
        }

        // 拖动热区
        if (drag) {
          // 相对页面当前位置
          var initPosition = getOffset(drag.parentNode)

          // 相对container当前位置
          var startPosition = {
            x: drag.parentNode.style.left || getCss(drag.parentNode, 'left'),
            y: drag.parentNode.style.top || getCss(drag.parentNode, 'top')
          }

          // 鼠标移动限制
          var limitArea = {
            maxLeft: usearea.left + usearea.width - (initPosition.left + initPosition.width - e.clientX),
            maxTop: usearea.top + usearea.height - (initPosition.top + initPosition.height - e.clientY),
            minLeft: usearea.left + (e.clientX - initPosition.left),
            minTop: usearea.top + (e.clientY - initPosition.top)
          }

          document.onmousemove = function (e) {
            if (flag) {
              // 拖动热区标签
              dragAreaFlag = true
              currentHotBox = drag.parentNode

              // 热区拖动限制
              var movelimit = {
                x: e.clientX > limitArea.maxLeft ? limitArea.maxLeft : e.clientX < limitArea.minLeft ? limitArea.minLeft : e.clientX,
                y: e.clientY > limitArea.maxTop ? limitArea.maxTop : e.clientY < limitArea.minTop ? limitArea.minTop : e.clientY
              }

              drag.parentNode.style.left = parseInt(startPosition.x) + movelimit.x - start.x + 'px'
              drag.parentNode.style.top = parseInt(startPosition.y) + movelimit.y - start.y + 'px'
            }
          }
        }

        // 拖动边框
        if (target.classList.contains('cropper-point')) {
          // 相对container当前位置
          var initAttr = {
            width: target.parentNode.style.width || getCss(target.parentNode, 'width'),
            height: target.parentNode.style.height || getCss(target.parentNode, 'height'),
            left: target.parentNode.style.left || getCss(target.parentNode, 'left'),
            top: target.parentNode.style.top || getCss(target.parentNode, 'top'),
            direct: target.dataset.direct || 'se'
          }

          document.onmousemove = function (e) {
            if (flag) {
              // 拖动缩放标签
              dragPointFlag = true
              currentHotBox = target.parentNode

              // 鼠标移动距离
              var moveArea = {
                x: e.clientX > usearea.left + usearea.width ? usearea.left + usearea.width - start.x : e.clientX < usearea.left ? usearea.left - start.x : e.clientX - start.x,
                y: e.clientY > usearea.top + usearea.height ? usearea.top + usearea.height - start.y : e.clientY < usearea.top ? usearea.top - start.y : e.clientY - start.y
              }
              if (initAttr.direct === 'e') {
                let nowW = parseInt(initAttr.width) + parseInt(moveArea.x)
                target.parentNode.style.width = nowW + 'px'
              }
              if (initAttr.direct === 's') {
                let nowH = parseInt(initAttr.height) + parseInt(moveArea.y)
                target.parentNode.style.height = nowH + 'px'
              }
              if (initAttr.direct === 'w') {
                let nowW = parseInt(initAttr.width) - parseInt(moveArea.x)
                let offLeft = parseInt(initAttr.left) + parseInt(moveArea.x)
                target.parentNode.style.width = nowW + 'px'
                target.parentNode.style.left = offLeft + 'px'
              }
              if (initAttr.direct === 'n') {
                let nowH = parseInt(initAttr.height) - parseInt(moveArea.y)
                let offTop = parseInt(initAttr.top) + parseInt(moveArea.y)
                target.parentNode.style.height = nowH + 'px'
                target.parentNode.style.top = offTop + 'px'
              }
              if (initAttr.direct === 'ne') {
                let nowW = parseInt(initAttr.width) + parseInt(moveArea.x)
                let nowH = parseInt(initAttr.height) - parseInt(moveArea.y)
                let offTop = parseInt(initAttr.top) + parseInt(moveArea.y)
                target.parentNode.style.height = nowH + 'px'
                target.parentNode.style.top = offTop + 'px'
                target.parentNode.style.width = nowW + 'px'
              }
              if (initAttr.direct === 'nw') {
                let nowH = parseInt(initAttr.height) - parseInt(moveArea.y)
                let offTop = parseInt(initAttr.top) + parseInt(moveArea.y)
                let nowW = parseInt(initAttr.width) - parseInt(moveArea.x)
                let offLeft = parseInt(initAttr.left) + parseInt(moveArea.x)
                target.parentNode.style.width = nowW + 'px'
                target.parentNode.style.left = offLeft + 'px'
                target.parentNode.style.height = nowH + 'px'
                target.parentNode.style.top = offTop + 'px'
              }
              if (initAttr.direct === 'sw') {
                let nowH = parseInt(initAttr.height) + parseInt(moveArea.y)
                let nowW = parseInt(initAttr.width) - parseInt(moveArea.x)
                let offLeft = parseInt(initAttr.left) + parseInt(moveArea.x)
                target.parentNode.style.height = nowH + 'px'
                target.parentNode.style.width = nowW + 'px'
                target.parentNode.style.left = offLeft + 'px'
              }
              if (initAttr.direct === 'se') {
                let nowW = parseInt(initAttr.width) + parseInt(moveArea.x)
                let nowH = parseInt(initAttr.height) + parseInt(moveArea.y)
                target.parentNode.style.width = nowW + 'px'
                target.parentNode.style.height = nowH + 'px'
              }
            }
          }
        }
      }, false)

      document.addEventListener('mouseup', function (e) {
        // 是否新增热区
        if (addHotFlag) {
          // 20可以通过陪参传入
          if (parseInt(newHotBox.style.width) < 20 || parseInt(newHotBox.style.height) < 20) {
            // console.log(newHotBox)
            newHotBox && newHotBox.parentNode.removeChild(newHotBox)
            parseInt(newHotBox.style.width) < 20 && console.log('热区宽度太窄了，建议大于20px')
            parseInt(newHotBox.style.height) < 20 && console.log('热区高度太小了，建议大于20px')
          } else {
            document.querySelectorAll('div.crop-box').forEach(function (val) {
              val.classList.remove('active')
            })
            newHotBox.classList.add('active')
            opt.newcallback && opt.newcallback(newHotBox)
          }
        }

        // 是否拖动热区
        if (dragAreaFlag) {
          document.querySelectorAll('div.crop-box').forEach(function (val) {
            val.classList.remove('active')
          })
          currentHotBox.classList.add('active')
          opt.dragareacallback && opt.dragareacallback(currentHotBox)
        }

        // 是否拖动缩放
        if (dragPointFlag) {
          document.querySelectorAll('div.crop-box').forEach(function (val) {
            val.classList.remove('active')
          })
          currentHotBox.classList.add('active')
          opt.dragpointcallback && opt.dragpointcallback(currentHotBox)
        }

        flag = false
        addHotFlag = false
        dragAreaFlag = false
        dragPointFlag = false
        currentHotBox = null
        newHotBox = null
        start = null

        // 释放拖动事件
        document.onmousemove = null
        document.onselectstart = null
        container.ondragstart = null
      }, false)

      container.addEventListener('click', function (e) {
        var t = e.target
        var drag = null
        var parent = t.parentNode
        // 获取标记的拖动元素
        if (t.classList.contains('crop-box-content')) {
          drag = t
        }
        while (parent && drag == null) {
          if (parent.classList && parent.classList.contains('crop-box-content')) {
            drag = parent
          } else {
            parent = parent.parentNode
          }
        }
        if (drag) {
          document.querySelectorAll('div.crop-box').forEach(function (val) {
            val.classList.remove('active')
          })
          drag.parentNode.classList.add('active')
          opt.clickcallback && opt.clickcallback(drag.parentNode)
        }
      }, false)
    }
  }

  return dragarea
}))
