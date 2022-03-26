<template>
  <div class="mdui-dialog" id="mainTheme">
    <div class="mdui-dialog-title">设置主题色</div>
    <div class="mdui-dialog-content" id="layoutChoose">
      <p class="mdui-typo-title">主题色</p>
      <div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
        <div class="mdui-col">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="theme-layout"
              value="auto"
              checked=""
              v-on:click="autoTheme"
            />
            <i class="mdui-radio-icon"></i>
            Auto
          </label>
        </div>
        <div class="mdui-col">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="theme-layout"
              value="light"
              v-on:click="lightTheme"
            />
            <i class="mdui-radio-icon"></i>
            Light
          </label>
        </div>
        <div class="mdui-col">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="theme-layout"
              value="dark"
              v-on:click="nightTheme"
            />
            <i class="mdui-radio-icon"></i>
            Dark
          </label>
        </div>
      </div>

      <p class="mdui-typo-title mdui-text-color-theme">主色</p>
      <form
        class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3"
        id="themeColor"
        v-on:click="chooseTheme($event)"
      >
        <div class="mdui-col mdui-text-color-amber">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="amber" />
            <i class="mdui-radio-icon"></i>
            Amber
          </label>
        </div>
        <div class="mdui-col mdui-text-color-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="blue" />
            <i class="mdui-radio-icon"></i>
            Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-blue-grey">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="blue-grey" />
            <i class="mdui-radio-icon"></i>
            Blue Grey
          </label>
        </div>
        <div class="mdui-col mdui-text-color-brown">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="brown" />
            <i class="mdui-radio-icon"></i>
            Brown
          </label>
        </div>
        <div class="mdui-col mdui-text-color-cyan">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="cyan" />
            <i class="mdui-radio-icon"></i>
            Cyan
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="deep-orange" />
            <i class="mdui-radio-icon"></i>
            Deep Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="deep-purple" />
            <i class="mdui-radio-icon"></i>
            Deep Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-green">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="green" />
            <i class="mdui-radio-icon"></i>
            Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-grey">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="grey" />
            <i class="mdui-radio-icon"></i>
            Grey
          </label>
        </div>
        <div class="mdui-col mdui-text-color-indigo">
          <label class="mdui-radio mdui-m-b-1">
            <input
              type="radio"
              name="theme-primary"
              value="indigo"
              checked=""
            />
            <i class="mdui-radio-icon"></i>
            Indigo
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="light-blue" />
            <i class="mdui-radio-icon"></i>
            Light Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-green">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="light-green" />
            <i class="mdui-radio-icon"></i>
            Light Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-lime">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="lime" />
            <i class="mdui-radio-icon"></i>
            Lime
          </label>
        </div>
        <div class="mdui-col mdui-text-color-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="orange" />
            <i class="mdui-radio-icon"></i>
            Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-pink">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="pink" />
            <i class="mdui-radio-icon"></i>
            Pink
          </label>
        </div>
        <div class="mdui-col mdui-text-color-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="purple" />
            <i class="mdui-radio-icon"></i>
            Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-red">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="red" />
            <i class="mdui-radio-icon"></i>
            Red
          </label>
        </div>
        <div class="mdui-col mdui-text-color-teal">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="teal" />
            <i class="mdui-radio-icon"></i>
            Teal
          </label>
        </div>
        <div class="mdui-col mdui-text-color-yellow">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-primary" value="yellow" />
            <i class="mdui-radio-icon"></i>
            Yellow
          </label>
        </div>
      </form>

      <p class="mdui-typo-title mdui-text-color-theme-accent">强调色</p>
      <form
        class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3"
        id="accentColor"
        v-on:click="chooseAccent($event)"
      >
        <div class="mdui-col mdui-text-color-amber">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="amber" />
            <i class="mdui-radio-icon"></i>
            Amber
          </label>
        </div>
        <div class="mdui-col mdui-text-color-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="blue" />
            <i class="mdui-radio-icon"></i>
            Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-cyan">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="cyan" />
            <i class="mdui-radio-icon"></i>
            Cyan
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="deep-orange" />
            <i class="mdui-radio-icon"></i>
            Deep Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-deep-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="deep-purple" />
            <i class="mdui-radio-icon"></i>
            Deep Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-green">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="green" />
            <i class="mdui-radio-icon"></i>
            Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-indigo">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="indigo" />
            <i class="mdui-radio-icon"></i>
            Indigo
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-blue">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="light-blue" />
            <i class="mdui-radio-icon"></i>
            Light Blue
          </label>
        </div>
        <div class="mdui-col mdui-text-color-light-green">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="light-green" />
            <i class="mdui-radio-icon"></i>
            Light Green
          </label>
        </div>
        <div class="mdui-col mdui-text-color-lime">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="lime" />
            <i class="mdui-radio-icon"></i>
            Lime
          </label>
        </div>
        <div class="mdui-col mdui-text-color-orange">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="orange" />
            <i class="mdui-radio-icon"></i>
            Orange
          </label>
        </div>
        <div class="mdui-col mdui-text-color-pink">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="pink" checked="" />
            <i class="mdui-radio-icon"></i>
            Pink
          </label>
        </div>
        <div class="mdui-col mdui-text-color-purple">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="purple" />
            <i class="mdui-radio-icon"></i>
            Purple
          </label>
        </div>
        <div class="mdui-col mdui-text-color-red">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="red" />
            <i class="mdui-radio-icon"></i>
            Red
          </label>
        </div>
        <div class="mdui-col mdui-text-color-teal">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="teal" />
            <i class="mdui-radio-icon"></i>
            Teal
          </label>
        </div>
        <div class="mdui-col mdui-text-color-yellow">
          <label class="mdui-radio mdui-m-b-1">
            <input type="radio" name="theme-accent" value="yellow" />
            <i class="mdui-radio-icon"></i>
            Yellow
          </label>
        </div>
      </form>
    </div>
    <div class="mdui-divider"></div>

    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple mdui-float-left" id="resetTheme" mdui-dialog-cancle="">Reset</button>
      <button class="mdui-btn mdui-ripple" mdui-dialog-confirm="">ok</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>