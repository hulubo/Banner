var e = function(selector) {
    return document.querySelector(selector)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}


var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}


var nextIndex = function(button) {
    var father = button.parentElement
    var slide = father.parentElement
    // 得到图片总数和当前图片下标
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // 求出下一张图片的 id
    var offset = parseInt(button.dataset.next)
    var index = (numberOfImgs + activeIndex + offset) % numberOfImgs
    // 设置父节点的 data-active
    slide.dataset.active = index
    return index
}

var showImage = function(index) {
    console.log('index', index)
    // 得到下一张图片的选择器
    var n = (-1200) * (index)
    e('.slide').style.transform = `translateX(${n}px)`
}

var showIndex = function(index) {
  var nextSelector = '#id-index-' + String(index)
  // 删除当前图片的 class 给下一张图片加上 class
  var className = 'on'
  removeClassAll(className)
  var cr = e(nextSelector)
  cr.classList.add(className)
}


var bindEventSlide = function() {
    var selector = '.next'
    bindAll(selector, 'click', function(event) {
        console.log('click')
        button = event.target
        var newIndex = nextIndex(button)
        showImage(newIndex)
        showIndex(newIndex)
    })
}

var play = function() {
  var container = e('.container')
  var button = e('.next.vertical-center.right')
  setInterval(function(){
    //模拟点击
      button.click()
  }, 4000)

}

var __main = function() {
    bindEventSlide()
    play()
}

__main()
