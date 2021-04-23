!function(e) {
    var t = {};
    function i(n) {
        if (t[n])
            return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, i),
        o.l = !0,
        o.exports
    }
    i.m = e,
    i.c = t,
    i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(e, t) {
        if (1 & t && (e = i(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (i.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var o in e)
                i.d(n, o, function(t) {
                    return e[t]
                }
                .bind(null, o));
        return n
    }
    ,
    i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return i.d(t, "a", t),
        t
    }
    ,
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    i.p = "",
    i(i.s = 3)
}([function(e, t) {
    var i = function() {};
    function n(e) {
        var t = Date.now();
        return "undefined" != typeof performance && "function" == typeof performance.now && (t += performance.now()),
        "xxxxxxxxxxxxxxx".replace(/[x]/g, function(e) {
            var i = (t + 36 * Math.random()) % 36 | 0;
            return t = Math.floor(t / 36),
            rc = ("x" === e ? i : 3 & i | 8).toString(36),
            Math.random() > .5 ? rc : rc.toUpperCase()
        }) + e
    }
    i.prototype.attachEvent = function(e, t, i, n) {
        if (this[t] || (this[t] = []),
        !(this[t]instanceof Array))
            return !1;
        for (var o = 0; o < this[t].length; o++)
            if (this[t][o].o == e && this[t][o].f == i)
                return !0;
        return this[t].push({
            o: e,
            f: i,
            t: n
        }),
        !0
    }
    ,
    i.prototype.detachEvent = function(e, t, i) {
        if (!(this[t] && this[t]instanceof Array))
            return !1;
        for (var n = 0; n < this[t].length; n++)
            if (this[t][n].o == e && this[t][n].f == i)
                return this[t].splice(n, 1),
                0 == this[t].length && delete this[t],
                !0;
        return !1
    }
    ,
    i.prototype.fireEvent = function(e) {
        if (!(this[e] && this[e]instanceof Array))
            return !1;
        for (var t = [].slice.call(arguments), i = this[e].slice(0), n = !1, o = 0; o < i.length && ("number" == typeof i[o].t ? i[o].f.delayApply(i[o].t, i[o].o, t.slice(1)) : n |= i[o].f.apply(i[o].o, t.slice(1)),
        !n); o++)
            ;
        return n
    }
    ,
    e.exports = {
        EventContainer: i,
        generalWebPeerId: n,
        getWebPeerId: function(e, t) {
            chrome.storage.local.get("__XLWebPeerId__", function(i) {
                if (i && i.__XLWebPeerId__)
                    t(i.__XLWebPeerId__);
                else {
                    var o = n(e);
                    chrome.storage.local.set({
                        __XLWebPeerId__: o
                    }),
                    t(o)
                }
            })
        },
        versionCompare: function(e, t) {
            var i = e.split(".")
              , n = t.split(".")
              , o = Math.min(i.length, n.length)
              , r = null;
            for (let e = 0; e < o; e++) {
                if (i[e] < n[e]) {
                    r = -1;
                    break
                }
                if (i[e] > n[e]) {
                    r = 1;
                    break
                }
                e === o && i[e] === n[e] && (r = 0)
            }
            return r
        },
        Ajax: function(e) {
            (e = e || {}).data = e.data || {};
            var t = e.jsonp ? jsonp(e) : t(e);
            function t(e) {
                e.type = (e.type || "GET").toUpperCase(),
                e.data = function(e) {
                    var t = [];
                    for (var i in e)
                        t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                    return t.join("&")
                }(e.data);
                var t = new XMLHttpRequest;
                t.onreadystatechange = function() {
                    if (4 == t.readyState) {
                        var i = t.status;
                        if (i >= 200 && i < 300) {
                            var n = ""
                              , o = t.getResponseHeader("Content-type");
                            n = -1 !== o.indexOf("xml") && t.responseXML ? t.responseXML : -1 !== o.toLowerCase().indexOf("application/json") ? JSON.parse(t.responseText) : t.responseText,
                            e.success && e.success(n)
                        } else
                            e.error && e.error(i)
                    }
                }
                ,
                "GET" == e.type ? (e.data.length > 0 ? t.open(e.type, e.url + "?" + e.data, !0) : t.open(e.type, e.url, !0),
                t.send(null)) : (t.open(e.type, e.url, !0),
                t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                t.send(e.data))
            }
        }
    }
}
, function(e, t, i) {
    var {EventContainer: n} = i(0);
    function o() {
        this.nativePort = null,
        this.eventContainer = new n,
        this.selfQuit = !1,
        this.callbackMap = {},
        this.callbackIdIndex = 1,
        this.disconnectTimer = void 0
    }
    o.prototype = {
        onNativeMessage: function(e) {
            var t = e.callbackId;
            if (t) {
                var i = this.callbackMap[t];
                i && (i.f.apply(i.o, [!0, e.result, e.paramters]),
                delete this.callbackMap[t])
            }
            this.eventContainer.fireEvent("OnNativeMessage", e)
        },
        onDisconnect: function() {
            if (this.nativePort = null,
            this.callbackMap)
                for (let t in this.callbackMap)
                    if (t) {
                        var e = this.callbackMap[t];
                        e && (e.f.apply(e.o, [!1]),
                        delete this.callbackMap[t])
                    }
            this.eventContainer.fireEvent("OnDisconnect", this.selfQuit)
        },
        attachConnectEvent: function(e, t) {
            this.eventContainer.attachEvent(e, "OnConnect", t)
        },
        attachDisconnectEvent: function(e, t) {
            this.eventContainer.attachEvent(e, "OnDisconnect", t)
        },
        attachNativeMessage: function(e, t) {
            this.eventContainer.attachEvent(e, "OnNativeMessage", t)
        },
        postMessage: function(e, t, i, n) {
            var o = !0;
            do {
                if (null == this.nativePort && this.connect(),
                !this.nativePort) {
                    o = !1;
                    break
                }
                var r = void 0;
                n && (r = this.callbackIdIndex++);
                var s = {
                    funcName: e,
                    paramters: t,
                    callbackId: r
                };
                try {
                    this.nativePort.postMessage(s)
                } catch (e) {
                    o = !1;
                    break
                }
                n && (this.callbackMap[r] = {
                    o: i,
                    f: n
                }),
                this.delayDisconnect()
            } while (0);
            return o || n && n.apply(i, [!1]),
            o
        },
        sendQuit: function() {
            this.nativePort && (this.selfQuit = !0,
            this.postMessage("ChromeQuit", []),
            this.nativePort = null),
            this.disconnectTimer && (clearTimeout(this.disconnectTimer),
            this.disconnectTimer = void 0)
        },
        isConnected: function() {
            return !!this.nativePort
        },
        delayDisconnect: function() {
            var e = this;
            this.disconnectTimer && clearTimeout(this.disconnectTimer),
            this.disconnectTimer = setTimeout(function() {
                e.disconnectTimer = void 0,
                e.sendQuit()
            }, 5e3)
        },
        connect: function() {
            var e = !1;
            do {
                if (this.nativePort) {
                    e = !0;
                    break
                }
                if (this.nativePort = chrome.runtime.connectNative("com.xunlei.thunder"),
                null == this.nativePort) {
                    this.eventContainer.fireEvent("OnConnect", !1);
                    break
                }
                var t = this;
                this.nativePort.onMessage.addListener(function(e) {
                    t.onNativeMessage(e)
                }),
                this.nativePort.onDisconnect.addListener(function() {
                    t.onDisconnect()
                }),
                this.eventContainer.fireEvent("OnConnect", !0),
                e = !0,
                this.delayDisconnect()
            } while (0);
            return e
        }
    };
    var r = new o;
    e.exports = {
        XLNativeMessage: r
    }
}
, function(e, t, i) {
    var {getWebPeerId: n, Ajax: o} = i(0)
      , {XLNativeMessage: r} = i(1)
      , s = void 0
      , a = function(e, t, i, n, r, a, l) {
        var c = "http://stat.download.xunlei.com:8099/?xlbtid=1&aid=" + e + "&id=" + t + "&peerid=" + r + "&userid=&referfrom=100001&OS=win&OSversion=" + a + "&productname=ThunderX&productversion=" + n + "&value3=" + s + "&value4=" + l;
        i && i.length > 0 && (c += "&" + i),
        o({
            url: c,
            type: "GET",
            success: function(e) {},
            error: function(e) {}
        })
    }
      , l = function(e, t, i) {
        r.postMessage("GetThunderInfo", [], void 0, function(o, r, s) {
            if (o) {
                var l = r[0].peerId
                  , c = r[0].osVersion
                  , u = r[0].thunderVersion
                  , h = r[0].parentProcess;
                a(e, t, i, u, l, c, h)
            } else
                n("Q", function(n) {
                    a(e, t, i, "", n, "", "")
                })
        })
    };
    e.exports = {
        stat: function(e, t, i) {
            s ? l(e, t, i) : o({
                url: chrome.extension.getURL("manifest.json"),
                type: "GET",
                success: function(n) {
                    s = n.version,
                    l(e, t, i)
                },
                error: function(e) {}
            })
        }
    }
}
, function(e, t, i) {
    i(0),
    i(1),
    i(2),
    e.exports = i(4)
}
, function(e, t, n) {
    var {Ajax: o} = n(0)
      , {XLNativeMessage: r} = n(1)
      , {stat: s} = n(2)
      , {XLBHOConfigWatcher: a} = n(5);
    function l() {
        this.headers = {},
        this.headers["user-agent"] = "",
        this.headers.referer = "",
        this.headers.cookie = "",
        this.headers["content-type"] = "",
        this.headers["content-disposition"] = "",
        this.headers.host = "",
        this.headers["content-length"] = 0,
        this.headers["access-control-allow-origin"] = "",
        this.url = "",
        this.fileName = "",
        this.ext = "",
        this.postData = "",
        this.tabId = void 0
    }
    function c() {
        this.pluginEnabled = !0,
        this.exception = !1,
        this.exceptionTimerId = void 0,
        this.blackListPageArray = [],
        this.blackListWebsiteArray = [],
        this.videoConfigGetted = !1,
        this.videoConfigs = null,
        this.monitorVideo = !0,
        this.isShortcutEnable = !0,
        this.monitorEmule = !1,
        this.monitorMagnet = !1,
        this.monitorTradition = !1,
        this.monitorIE = !1,
        this.enabledCapture = !0,
        this.monitorDomains = "",
        this.filterDomains = "",
        this.monitorFileExts = "",
        this.bUseChromeDownloadAPI = !!chrome.downloads
    }
    c.prototype = {
        MIME_TYPE_ARRAY: ["video/x-flv", "video/flv", "video/mp4", "video/x-mp4", "video/mpeg", "video/f4v", "application/octet-stream", "video/x-matroska", "video/x-webm", "audio/x-webm", "audio/mp4", "video/quicktime", "video/x-ms-wmv", "audio/webm", "video/webm", "video/f4f", "audio/mpeg", "application/vnd.apple.mpegurl", "application/x-mpegURL", "vnd.apple.mpegURL", "application/xml"],
        SUPPORT_MEDIA_EXT_ARRAY: ["swf", "mp3", "wma", "wmv", "mpg", "wav", "flv", "f4v", "3gp", "mp4", "rm", "rmvb", "mpeg", "webm", "hlv", "mkv", "ts"],
        SUPPORT_REQUEST_TYPE_ARRAY: ["main_frame", "sub_frame", "object", "xmlhttprequest", "other", "media"],
        requestItems: {},
        blockDownload: !1,
        tabUrls: {},
        currentTabId: void 0,
        isSupportRequestType: function(e) {
            for (var t in e = e.toLowerCase(),
            this.SUPPORT_REQUEST_TYPE_ARRAY)
                if (e === this.SUPPORT_REQUEST_TYPE_ARRAY[t])
                    return !0;
            return !1
        },
        isFrameRequestType: function(e) {
            return "main_frame" === e || "sub_frame" === e
        },
        isSupportContentType: function(e) {
            for (var t in e = e.toLowerCase(),
            this.MIME_TYPE_ARRAY)
                if (e.toLowerCase() === this.MIME_TYPE_ARRAY[t])
                    return !0;
            return !1
        },
        isSupportMediaExt: function(e) {
            for (var t in e = e.toLowerCase(),
            this.SUPPORT_MEDIA_EXT_ARRAY)
                if (e.toLowerCase() === this.SUPPORT_MEDIA_EXT_ARRAY[t])
                    return !0;
            return !1
        },
        getDispositionFileName: function(e) {
            var t = new RegExp("filename[^;=\n]*=((['\"]).*?|[^;\n]*)").exec(e);
            if (null === t)
                return "";
            var i = t[1];
            return i = (i = i.replace(/"([^"]*)"/g, "$1")).replace("UTF-8''", ""),
            decodeURIComponent(i.replace(/\+/g, ""))
        },
        getFileNameExt: function(e) {
            var t = "";
            if (e.length > 0) {
                var i = e.lastIndexOf(".");
                -1 !== i && (t = (t = e.substr(i)).toLowerCase())
            }
            return t
        },
        getUrlFileName: function(e) {
            var t = e.replace(/\?.*$/, "").replace(/.*\//, "");
            return decodeURIComponent(t)
        },
        isValidDownload: function(e) {
            var t = ""
              , i = e.headers["content-disposition"];
            if (i.length > 0 && (t = this.getDispositionFileName(i)),
            0 === t.length && (t = this.getUrlFileName(e.url)),
            0 === t.length)
                return !1;
            e.fileName = t;
            var n = e.headers["content-type"];
            if (-1 !== n.indexOf("text/") && (-1 === n.indexOf("text/multipart") || 0 === t.length))
                return !1;
            var o = this.getFileNameExt(t);
            return e.ext = o,
            !!this.canDownload(e) && this.isMonitorFileExt(o)
        },
        allowPromptThunder: function(e) {
            e && chrome.storage.local.get(t=>{
                if (t && t.xl_prompt_not_disturb)
                    e(!1);
                else {
                    let i = t.xl_prompt_close;
                    if (i && !isNaN(i) || (i = 0),
                    (i = Number(i)) < 2) {
                        let i = t.xl_prompt_limit_size;
                        i && !isNaN(i) || (i = 104857600),
                        i = Number(i),
                        e(!0, i)
                    } else
                        e(!1)
                }
            }
            )
        },
        tryThunderGuide: function(e) {
            do {
                let t = e.url;
                if (!t)
                    break;
                this.allowPromptThunder(function(i, n) {
                    if (i) {
                        let i = "";
                        if (0 === (t = t.toLowerCase()).indexOf("http://") || 0 === t.indexOf("https://")) {
                            let t = parseInt(e.headers["content-length"]);
                            t && t > n && (i = "当前文件过大，建议安装迅雷，启用高速下载")
                        }
                        if (i) {
                            let t = e.tabId;
                            chrome.tabs.sendMessage(t, {
                                name: "ThunderSupportReminder",
                                text: i
                            })
                        }
                    }
                })
            } while (0)
        },
        updateContextMenu: function(e) {
            chrome.contextMenus.update("ThunderContextMenu", {
                enabled: e
            }),
            chrome.contextMenus.update("ThunderContextMenu_MultiDownload", {
                enabled: e
            })
        },
        updataToolbarBadgeText: function(e, t) {
            var i = {
                text: e,
                tabId: t
            };
            chrome.browserAction.setBadgeText(i)
        },
        updataToolbarTips: function(e, t) {
            var i = {
                title: e,
                tabId: t
            };
            chrome.browserAction.setTitle(i)
        },
        updateBrowserActionIcon: function(e, t) {
            var i = {
                path: e,
                tabId: t
            };
            chrome.browserAction.setIcon(i)
        },
        setToolbarEnableStatus: function(e) {
            this.updateBrowserActionIcon("images/icon19_normal.png", e),
            this.updataToolbarTips("迅雷Chrome支持", e),
            this.updataToolbarBadgeText("", e)
        },
        setToolbarDisableStatus: function(e) {
            this.updateBrowserActionIcon("images/icon19_disabled.png", e),
            this.updataToolbarTips("迅雷Chrome支持已被禁用", e),
            this.updataToolbarBadgeText("", e)
        },
        setToolbarExceptionStatus: function() {
            this.updateBrowserActionIcon("images/icon19_normal.png"),
            this.updataToolbarTips("迅雷Chrome支持出现异常"),
            this.updataToolbarBadgeText("!")
        },
        setToolbarPageDisableStatus: function(e) {
            this.updateBrowserActionIcon("images/icon19_pageDisable.png", e),
            this.updataToolbarTips("当前页面已禁用迅雷Chrome支持", e),
            this.updataToolbarBadgeText("", e)
        },
        invokeThunder: function(e) {
            var t = e.headers.referer || "";
            t = (t = (t = (t = (t = (t = (t = (t = (t = t.concat("#@$@#")).concat(1, "#@$@#")).concat(e.url, "#@$@#")).concat(e.fileName, "#@$@#")).concat("", "#@$@#")).concat(e.headers.cookie, "#@$@#")).concat("", "#@$@#")).concat("", "#@$@#")).concat("", e.headers.stat || "", "#@$@#"),
            s(1022, 918),
            r.postMessage("DownLoadByThunder", [t])
        },
        downloadByThunder: function(e, t, i) {
            if (t.headers.referer && 0 !== t.headers.referer.length)
                this.invokeThunder(t);
            else if (void 0 === e || e < 0)
                this.invokeThunder(t);
            else {
                var n = this;
                this.getHrefById(e, e=>{
                    t.headers.referer = e,
                    n.invokeThunder(t)
                }
                , i)
            }
        },
        enumTabSetEnabled: function(e) {
            var t = this;
            chrome.tabs.query({
                active: !0
            }, function(i) {
                if (i)
                    for (var n = 0; n < i.length; n++) {
                        var o = i[n]
                          , r = t.isMonitorDomain(o.url)
                          , s = !t.checkIsPageInUserBlackList(o.url);
                        chrome.tabs.sendMessage(o.id, {
                            name: "UpdateWebsiteEnabled",
                            enable: r
                        }),
                        chrome.tabs.sendMessage(o.id, {
                            name: "UpdatePageEnabled",
                            enable: s
                        }),
                        t.setToolbarStatus(t.exception, e, r, s, o.id)
                    }
            })
        },
        setPluginEnabled: function(e) {
            var t = this;
            this.queryTabs({
                active: !0
            }, function(i) {
                chrome.tabs.sendMessage(i.id, {
                    name: "UpdatePluginEnabled",
                    enable: e,
                    exception: t.exception
                })
            }),
            this.pluginEnabled = e,
            this.enumTabSetEnabled(e),
            this.updateContextMenu(e),
            r.postMessage("SetPluginEnabled", [e])
        },
        queryTabs: function(e, t) {
            chrome.tabs.query(e, function(e) {
                if (e)
                    for (var i = 0; i < e.length; i++)
                        e[i].id >= 0 && t(e[i])
            })
        },
        setMonitorVideoTags: function(e) {
            chrome.tabs.getSelected(null, function(t) {
                chrome.tabs.sendMessage(t.id, {
                    name: "UpdateMoniterVideoTags",
                    enable: e
                })
            }),
            this.monitorVideo = e,
            chrome.storage.local.set({
                video_monitor: e
            })
        },
        setMultiSelectShortcutEnable: function(e) {
            chrome.tabs.getSelected(null, function(t) {
                chrome.tabs.sendMessage(t.id, {
                    name: "UpdateMultiSelectShortcutEnable",
                    enable: e
                })
            }),
            this.isShortcutEnable = e,
            chrome.storage.local.set({
                multi_select_shortcut_enable: e
            })
        },
        onAddBlackListPage: function(e, t, i) {
            e && t[0].retVal && (this.queryTabs({
                active: !0
            }, function(e) {
                chrome.tabs.sendMessage(e.id, {
                    name: "UpdatePageEnabled",
                    enable: !1
                })
            }),
            this.blackListPageArray[this.blackListPageArray.length] = i[0])
        },
        addBlackListPage: function(e, t) {
            for (var i in this.blackListPageArray)
                if (this.blackListPageArray[i] === e)
                    return;
            r.postMessage("AddBlackListPage", [e], this, this.onAddBlackListPage),
            this.setToolbarStatus(this.exception, this.pluginEnabled, !0, !1, t)
        },
        onRemoveBlackListPage: function(e, t, i) {
            if (e && t[0].retVal)
                for (var n in this.queryTabs({
                    active: !0
                }, function(e) {
                    chrome.tabs.sendMessage(e.id, {
                        name: "UpdatePageEnabled",
                        enable: !0
                    })
                }),
                this.blackListPageArray)
                    this.blackListPageArray[n] === i[0] && delete this.blackListPageArray[n]
        },
        removeBlackListPage: function(e, t) {
            for (var i in this.blackListPageArray)
                if (this.blackListPageArray[i] === e) {
                    r.postMessage("RemoveBlackListPage", [e], this, this.onRemoveBlackListPage),
                    this.setToolbarStatus(this.exception, this.pluginEnabled, !0, !0, t);
                    break
                }
        },
        notifyThunderMonitorSites: function() {
            a.setConfig("Monitor", "FilterSitesForUI", this.monitorDomains.replace(/\|\|/g, "\n")),
            a.updateWatchValue(this, this.onBrowserConfigMonitorDomainChange, "Monitor", "FilterSitesForUI", this.monitorDomains),
            r.postMessage("SetFilters", ["MonitorDomain", this.monitorDomains])
        },
        onAddOldBlackListWebsite: function(e, t, i) {
            e && t[0].retVal && (this.blackListWebsiteArray[this.blackListWebsiteArray.length] = i[0])
        },
        addOldBlackListWebsite: function(e) {
            for (var t in this.blackListWebsiteArray)
                if (this.blackListWebsiteArray[t] === e)
                    return;
            r.postMessage("AddBlackListWebsite", [e], this, this.onAddOldBlackListWebsite)
        },
        addBlackListWebsite: function(e, t) {
            this.isMonitorDomain(e) && (this.addMonitorDomain(e) && (this.notifyThunderMonitorSites(),
            this.addOldBlackListWebsite(e),
            this.queryTabs({
                active: !0
            }, function(e) {
                chrome.tabs.sendMessage(e.id, {
                    name: "UpdateWebsiteEnabled",
                    enable: !1
                })
            })),
            this.setToolbarStatus(this.exception, this.pluginEnabled, !1, !0, t))
        },
        onRemoveOldBlackListWebsite: function(e, t, i) {
            if (e && t[0].retVal)
                for (var n in this.blackListWebsiteArray)
                    this.blackListWebsiteArray[n] === i[0] && delete this.blackListWebsiteArray[n]
        },
        removeOldBlackListWebsite: function(e, t, i, n) {
            for (var o in this.blackListWebsiteArray)
                if (this.blackListWebsiteArray[o] === e) {
                    r.postMessage("RemoveBlackListWebsite", [e], this, this.onRemoveOldBlackListWebsite);
                    break
                }
        },
        removeBlackListWebsite: function(e, t, i, n) {
            this.isMonitorDomain(e) || this.removeMonitorDomain(e) && (this.notifyThunderMonitorSites(),
            this.removeOldBlackListWebsite(e, t, i, n),
            void 0 === n && (n = !this.checkIsPageInUserBlackList(t)),
            this.queryTabs({
                active: !0
            }, function(e) {
                chrome.tabs.sendMessage(e.id, {
                    name: "UpdateWebsiteEnabled",
                    enable: !0
                })
            }),
            this.setToolbarStatus(this.exception, this.pluginEnabled, !0, n, i))
        },
        enterMultiDownload: function(e, t) {
            chrome.tabs.sendMessage(e, {
                name: "EnterMultiSelect",
                tabId: e
            })
        },
        checkIsPageInUserBlackList: function(e) {
            var t = !1;
            for (var i in this.blackListPageArray)
                if (e === this.blackListPageArray[i]) {
                    t = !0;
                    break
                }
            return t
        },
        checkIsPageVideoEnable: function(e) {
            function t(e, t) {
                for (var i in t) {
                    var n = new RegExp(t[i],"i").exec(e);
                    if (null !== n)
                        return n
                }
                return null
            }
            var i = !1;
            do {
                if (!this.videoConfigs)
                    break;
                switch (this.videoConfigs.type) {
                case "disable":
                    break;
                case "white":
                    i = !(!this.videoConfigs.domains || !t(e, this.videoConfigs.domains));
                    break;
                case "black":
                    i = !this.videoConfigs.domains || !t(e, this.videoConfigs.domains)
                }
            } while (0);
            return i
        },
        canDownload: function(e) {
            var t = e.tabId
              , i = e.url;
            e.ext;
            if (!this.pluginEnabled)
                return !1;
            if (!this.enabledCapture)
                return !1;
            var n = "";
            return n = this.tabUrls[t] && "" !== this.tabUrls[t] ? this.tabUrls[t] : e.headers.referer || "",
            !!this.isMonitorDomain(n) && (!this.checkIsPageInUserBlackList(n) && !!this.isMoniterUrl(t, i, n))
        },
        isValidUrlAndMonitorProtocol: function(e) {
            if (0 === e.length)
                return !1;
            var t = e
              , i = t.indexOf(":");
            if (-1 === i)
                return !1;
            var n = t.substr(0, i + 1).toUpperCase();
            if ("" === n)
                return !1;
            var o = !0;
            return -1 !== "ED2K://".indexOf(n) ? !1 === this.monitorEmule && (o = !1) : -1 !== "MAGNET:?".indexOf(n) ? !1 === this.monitorMagnet && (o = !1) : -1 !== "HTTP://HTTPS://FTP://THUNDER://MMS://MMST://RTSP://RTSPU://XLAPP://".indexOf(n) ? !1 === this.monitorTradition && (o = !1) : o = !1,
            o
        },
        isMonitorDomain: function(e) {
            if (0 === e.length)
                return !0;
            var t = this.getUrlHost(e);
            if ("" === t)
                return !0;
            var i = new Array
              , n = this.monitorDomains.split("||");
            for (var o in n) {
                var r = n[o];
                0 === r.indexOf("*.") && (r = r.slice(2));
                var s = r.trimRight("|");
                i.push(s)
            }
            var a = !0;
            for (var l in i)
                if (i[l].length > 0 && -1 !== t.indexOf(i[l])) {
                    a = !1;
                    break
                }
            return a
        },
        isFilterDomain: function(e) {
            if (0 === e.length)
                return !1;
            if (0 === this.filterDomains.length)
                return !1;
            var t = new Array
              , i = this.filterDomains.split("||");
            for (var n in i) {
                var o = i[n].slice(2).toLowerCase().trimRight("|");
                t.push(o)
            }
            var r = !1
              , s = e.toLowerCase();
            for (var a in t)
                if (t[a] > 0 && -1 !== s.indexOf(t[a])) {
                    r = !0;
                    break
                }
            return r
        },
        getExtensionFileName: function(e) {
            var t = e.replace(/(\\+)/g, "#").split("#")
              , i = t[t.length - 1].split(".");
            return i[i.length - 1]
        },
        isMonitorFileExt: function(e) {
            var t = !1;
            return 0 !== e.length && (e = e.toLowerCase(),
            e += ";",
            -1 !== this.monitorFileExts.indexOf(e) && (t = !0),
            t)
        },
        isMoniterUrl: function(e, t, i) {
            return 0 !== t.length && (!1 !== this.monitorIE && (!1 !== this.isValidUrlAndMonitorProtocol(t) && (0 === i.length && (i = t),
            !1 !== this.isMonitorDomain(i) && !this.isFilterDomain(i))))
        },
        getUrlHost: function(e) {
            var t = /^(ftp|http[s]?):\/\/([^\/]*)[\/]?/.exec(e);
            return t && t[2] ? t[2] : ""
        },
        removeMonitorDomain: function(e) {
            var t = !1;
            if (0 === e.length)
                return t;
            var i = this.getUrlHost(e);
            if ("" === i)
                return t;
            var n = new Array
              , o = this.monitorDomains.split("||");
            for (var r in o) {
                var s = o[r];
                0 === s.indexOf("*.") && (s = s.slice(2));
                var a = s.trimRight("|");
                n.push(a)
            }
            for (r = 0; r < n.length; ++r)
                if (n[r].length > 0 && -1 !== i.indexOf(n[r])) {
                    o.splice(r, 1),
                    this.monitorDomains = o.join("||"),
                    t = !0;
                    break
                }
            return t
        },
        addMonitorDomain: function(e) {
            if (0 === e.length)
                return !1;
            var t = this.getUrlHost(e);
            if ("" === t)
                return !1;
            var i = new Array
              , n = this.monitorDomains.split("||");
            for (var o in n) {
                0 === (a = n[o]).indexOf("*.") && (a = a.slice(2));
                var r = a.trimRight("|");
                i.push(r)
            }
            var s = !0;
            for (o = 0; o < i.length; ++o)
                if (i[o].length > 0 && -1 !== t.indexOf(i[o])) {
                    s = !1;
                    break
                }
            if (s) {
                var a = "*." + t;
                this.monitorDomains = this.monitorDomains + "||" + a
            }
            return s
        },
        onIsDownloadURL: function(e, t, i) {
            if (e)
                if (t[0].retVal) {
                    var n = new l;
                    n.url = i[0],
                    n.headers.cookie = i[1],
                    n.headers.referer = i[2],
                    this.invokeThunder(n)
                } else
                    window.open(i[0])
        },
        onBeforeSendHeaders: function(e) {
            console.log("onBeforeSendHeaders")
            console.log(e)
            do {
                if (!this.isSupportRequestType(e.type))
                    break;
                var t = this.requestItems[e.requestId];
                t || (t = new l,
                this.requestItems[e.requestId] = t),
                t.tabId = e.tabId;
                var i = e.url;
                t.url && 0 !== t.url.length || (t.url = i);
                for (var n = 0; n < e.requestHeaders.length; ++n) {
                    var o = e.requestHeaders[n].name.toLowerCase()
                      , r = e.requestHeaders[n].value;
                    switch (o) {
                    case "user-agent":
                        t.headers["user-agent"] = r;
                        break;
                    case "referer":
                        t.headers.referer = r;
                        break;
                    case "cookie":
                        t.headers.cookie = r;
                        break;
                    case "content-type":
                        t.headers["content-type"] = r
                    }
                }
            } while (0);
            return {}
        },
        onHeadersReceived: function(e) {
            do {
                var t = e.statusCode;
                if (t >= 300 && t < 400 && 304 !== t)
                    break;
                if (0 === e.statusLine.indexOf("HTTP/1.1 204 Intercepted by the Xunlei Advanced Integration"))
                    break;
                var i = e.type;
                if (!this.isSupportRequestType(i))
                    break;
                var n = e.url
                  , o = this.requestItems[e.requestId];
                o ? delete this.requestItems[e.requestId] : (o = new l).tabId = e.tabId;
                for (var r = 0; r < e.responseHeaders.length; ++r) {
                    var s = e.responseHeaders[r].name.toLowerCase()
                      , a = e.responseHeaders[r].value;
                    switch (s) {
                    case "referer":
                        o.headers.referer = a;
                        break;
                    case "set-cookie":
                        0 === o.headers.cookie.length ? o.headers.cookie = a : o.headers.cookie = o.headers.cookie + "; " + a;
                        break;
                    case "access-control-allow-origin":
                        originHender = "Origin: " + a;
                        break;
                    case "host":
                        o.headers.host = a;
                        break;
                    case "content-disposition":
                        o.headers["content-disposition"] = a;
                        break;
                    case "content-length":
                        o.headers["content-length"] = a;
                        break;
                    case "content-type":
                        o.headers["content-type"] = a
                    }
                }
                if (0 === n.length && (n = host),
                o.url = n,
                !this.isFrameRequestType(i)) {
                    0 === o.fileName.length && (o.fileName = this.getUrlFileName(o.url));
                    var c = this.getFileNameExt(o.fileName);
                    if (0 === c.length) {
                        var u = this.getUrlFileName(o.url);
                        c = this.getFileNameExt(u)
                    }
                    var h = o.headers["content-type"];
                    if (0 === h.length && !this.isSupportMediaExt(c))
                        break;
                    if (parseInt(o.headers["content-length"]) < 2097152 || "swf" === c)
                        break;
                    if (this.isSupportContentType(h))
                        break;
                    break
                }
                if (2 !== Math.round(e.statusCode / 100) && "other" === i)
                    break;
                if (!this.isValidDownload(o)) {
                    this.exception && this.tryThunderGuide(o);
                    break
                }
                this.blockDownload = !0,
                o.headers.referer && o.headers.cookie ? this.downloadByThunder(e.tabId, o) : chrome.tabs.get(e.tabId, t=>{
                    var i = t.openerTabId;
                    o.headers.cookie ? this.downloadByThunder(e.tabId, o, i) : chrome.cookies.getAll({
                        url: o.url
                    }, t=>{
                        var n = "";
                        if (t)
                            for (var r in t)
                                n = n.concat(t[r].name, "=", t[r].value, "; ");
                        o.headers.cookie = n,
                        this.downloadByThunder(e.tabId, o, i)
                    }
                    )
                }
                )
            } while (0);
            return {}
        },
        getHrefById(e, t, i) {
            chrome.tabs.get(i || e, e=>{
                t(e.url)
            }
            )
        },
        onTabCreated: function(e) {
            e.url ? this.tabUrls[e.id] = e.url : e.openerTabId && this.tabUrls[e.openerTabId] ? this.tabUrls[e.id] = this.tabUrls[e.openerTabId] : this.tabUrls[e.id] = ""
        },
        onTabActivated: function(e) {
            chrome.tabs.sendMessage(e.tabId, {
                name: "OnActivated",
                tabId: e.tabId
            }),
            this.currentTabId = e.tabId
        },
        onTabRemoved: function(e, t) {
            e in this.requestItems && delete this.requestItems[e],
            e in this.tabUrls && delete this.tabUrls[e]
        },
        onTabUpdated: function(e, t, i) {
            t.url && (this.tabUrls[e] = t.url)
        },
        onQueryAllTabs: function(e) {
            if (e && e.length > 0)
                for (var t = 0; t < e.length; ++t)
                    this.tabUrls[e[t].id] = e[t].url
        },
        cancelChromeDownload: function(e) {
            chrome.downloads.cancel(e.id),
            chrome.downloads.erase({
                id: e.id
            }, function(e) {}),
            "" !== e.referrer && "about:blank" !== e.referrer || chrome.tabs.getSelected(null, function(e) {
                e && ("" !== e.url && "about:blank" !== e.url || chrome.tabs.remove(e.id))
            })
        },
        onDownloadCreated: function(e) {
            do {
                if ("complete" === e.state || "interrupted" === e.state)
                    break;
                if (this.blockDownload) {
                    this.blockDownload = !1,
                    this.cancelChromeDownload(e);
                    break
                }
            } while (0)
        },
        registerEventListener: function() {
            var e = this;
            chrome.extension.onRequest.addListener(function(t, i, n) {
                if ("xl_download" === t.name) {
                    var o = new l;
                    o.url = t.link,
                    t.fileName && (o.fileName = t.fileName),
                    o.headers.cookie = t.cookie,
                    o.headers.referer = t.referurl,
                    o.headers.stat = t.stat,
                    e.invokeThunder(o),
                    "chrome_download_video" === t.stat && s(1022, 923, "value1=" + encodeURIComponent(t.referurl || ""))
                } else if ("VideoShow" === t.name)
                    s(1022, 922, "value1=" + encodeURIComponent(t.referurl || ""));
                else if ("EnabledCapture" === t.name)
                    this.enabledCapture = t.capture;
                else if ("CheckActivated" === t.name)
                    chrome.tabs.query({
                        url: t.url
                    }, function(e) {
                        if (e)
                            for (var t = 0; t < e.length; t++) {
                                var i = e[t];
                                i.active && chrome.tabs.sendMessage(i.id, {
                                    name: "OnActivated",
                                    tabId: i.id
                                })
                            }
                    });
                else if ("CheckEnabled" === t.name) {
                    var a = e.pluginEnabled
                      , c = e.monitorVideo
                      , u = e.isShortcutEnable
                      , h = this.isMonitorDomain(t.url)
                      , d = !e.checkIsPageInUserBlackList(t.url);
                    n({
                        bPlugin: a,
                        bMonitorVideo: c,
                        bWebsite: h,
                        bPage: d,
                        bShortcutEnable: u
                    }),
                    e.setToolbarStatus(e.exception, e.pluginEnabled, h, d, t.tabId)
                } else if ("xl_check_url" === t.name)
                    r.postMessage("IsDownloadURL", [t.link, t.cookie, t.referurl], e, e.onIsDownloadURL);
                else if ("GetConfig" === t.name)
                    n({
                        bMonitorEmule: e.monitorEmule,
                        bMonitorMagnet: e.monitorMagnet,
                        bMonitorTradition: e.monitorTradition,
                        bMonitorIE: e.monitorIE,
                        monitorDomains: e.monitorDomains,
                        filterDomains: e.filterDomains,
                        monitorFileExts: e.monitorFileExts
                    });
                else if ("CheckVideoInWhiteList" === t.name) {
                    n({
                        videoInWhiteList: e.checkIsPageVideoEnable(t.url),
                        bPlugin: a = e.pluginEnabled,
                        bMonitorVideo: c = e.monitorVideo
                    })
                }
            }),
            chrome.runtime.onMessage.addListener(function(t, i, n) {
                if ("xl_chrome_iframe_keydown" === t.name)
                    chrome.tabs.sendMessage(i.tab.id, t);
                else if ("xl_chrome_iframe_multi_hotkey" === t.name)
                    chrome.tabs.sendMessage(i.tab.id, t);
                else if ("xl_download_multi_start" === t.name)
                    s(1022, 924, "value1=" + encodeURIComponent(t.referurl || ""));
                else if ("xl_download_multi" === t.name) {
                    var o = t.urls.length;
                    if (s(1022, 925, "value1=" + encodeURIComponent(t.referurl || "") + "&value2=" + o),
                    o > 0) {
                        var a = t.referurl || "";
                        a = (a = a.concat("#@$@#")).concat(o, "#@$@#");
                        for (let e of t.urls)
                            a = (a = (a = (a = (a = (a = a.concat(e, "#@$@#")).concat("", "#@$@#")).concat("", "#@$@#")).concat(t.cookie, "#@$@#")).concat("", "#@$@#")).concat("", "#@$@#");
                        s(1022, 918),
                        r.postMessage("DownLoadByThunder", [a])
                    }
                } else if ("xl_prompt_click" === t.name) {
                    let e = ""
                      , i = t.action;
                    if ("install" === i) {
                        e = "download_thunder";
                        const t = "https://down.sandai.net/thunder11/XunLeiWebSetup_ext.exe";
                        chrome.tabs.create({
                            url: t
                        }, function() {})
                    } else
                        "not_disturb" === i ? (e = "no_notice",
                        chrome.storage.local.set({
                            xl_prompt_not_disturb: !0
                        })) : "close" === i && (e = "close",
                        chrome.storage.local.get("xl_prompt_close", e=>{
                            let t = e.xl_prompt_close;
                            t && !isNaN(t) || (t = 0),
                            t = Number(t),
                            chrome.storage.local.set({
                                xl_prompt_close: t + 1
                            })
                        }
                        ));
                    e && s(1022, 929, "value2=" + e)
                } else if ("xl_prompt_show" === t.name)
                    s(1022, 928);
                else if ("xl_prompt_enable" === t.name) {
                    var l = n;
                    return e.allowPromptThunder((e,t)=>{
                        l({
                            enable: e
                        })
                    }
                    ),
                    !0
                }
            }),
            this.bUseChromeDownloadAPI && chrome.downloads.onCreated.addListener(function(t) {
                return e.onDownloadCreated(t)
            }),
            chrome.webRequest && (chrome.webRequest.onHeadersReceived.addListener(function(t) {
                return e.onHeadersReceived(t)
            }, {
                urls: ["<all_urls>"]
            }, ["blocking", "responseHeaders"]),
            chrome.webRequest.onBeforeSendHeaders.addListener(function(t) {
                return e.onBeforeSendHeaders(t)
            }, {
                urls: ["<all_urls>"]
            }, ["blocking", "requestHeaders"])),
            chrome.tabs && (chrome.tabs.onCreated.addListener(function(t) {
                return e.onTabCreated(t)
            }),
            chrome.tabs.onActivated.addListener(function(t) {
                e.onTabActivated(t)
            }),
            chrome.tabs.onRemoved.addListener(function(t, i) {
                e.onTabRemoved(t, i)
            }),
            chrome.tabs.onUpdated.addListener(function(t, i, n) {
                e.onTabUpdated(t, i, n)
            }),
            chrome.tabs.query({}, function(t) {
                e.onQueryAllTabs(t)
            }))
        },
        setToolbarStatus: function(e, t, i, n, o) {
            do {
                if (e) {
                    this.setToolbarExceptionStatus();
                    break
                }
                if (!t) {
                    this.setToolbarDisableStatus(o);
                    break
                }
                if (i && n) {
                    this.setToolbarEnableStatus(o);
                    break
                }
                this.setToolbarPageDisableStatus(o);
                break
            } while (0)
        },
        onStartupThunder: function(e, t) {
            var n = this;
            chrome.cookies.getAll({
                url: e.linkUrl
            }, function(t) {
                var o = "";
                for (i in t)
                    o = o.concat(t[i].name, "=", t[i].value, "; ");
                var r = new l;
                r.url = e.linkUrl,
                r.headers.cookie = o,
                r.headers.referer = e.pageUrl,
                n.invokeThunder(r)
            })
        },
        createContextMenu: function(e) {
            var t = this
              , i = {
                id: "ThunderContextMenu",
                type: "normal",
                title: chrome.i18n.getMessage("context_title"),
                contexts: ["link"],
                onclick: function(e, i) {
                    t.onStartupThunder(e, i)
                },
                enabled: e
            };
            chrome.contextMenus.create(i, function() {});
            var n = {
                id: "ThunderContextMenu_MultiDownload",
                type: "normal",
                title: chrome.i18n.getMessage("multi_context_title"),
                contexts: ["page"],
                onclick: function(e, t) {
                    var i = t.id;
                    chrome.tabs.sendMessage(i, {
                        name: "EnterMultiSelect",
                        tabId: i
                    })
                },
                enabled: e
            };
            chrome.contextMenus.create(n, function() {})
        },
        onGetBlackListWebsites: function(e, t, i) {
            if (e && t[0].retVal) {
                var n = !1;
                for (var o in this.blackListWebsiteArray = t[1].blackList,
                this.blackListWebsiteArray)
                    this.isMonitorDomain(this.blackListWebsiteArray[o]) && this.addMonitorDomain(this.blackListWebsiteArray[o]) && (n = !0);
                n && this.notifyThunderMonitorSites()
            }
        },
        onGetBlackListPages: function(e, t, i) {
            e && (t[0].retVal ? this.blackListPageArray = t[1].blackList : this.blackListPageArray = [])
        },
        onGetIsMonitorProtocol: function(e, t, i) {
            e && t[0].retVal && ("MonitorEmule" === i[0] ? this.monitorEmule = t[1].value : "MonitorMagnet" === i[0] ? this.monitorMagnet = t[1].value : "MonitorTradition" === i[0] ? this.monitorTradition = t[1].value : "MonitorIE" === i[0] && (this.monitorIE = t[1].value))
        },
        onGetFiters: function(e, t, i) {
            e && t[0].retVal && ("MonitorDemain" === i[0] ? (this.monitorDomains = t[1].value,
            a.addWatch(this, this.onBrowserConfigMonitorDomainChange, "Monitor", "FilterSitesForUI", this.monitorDomains),
            r.postMessage("GetBlackListWebsites", [], this, this.onGetBlackListWebsites)) : "FilterDemain" === i[0] ? this.filterDomains = t[1].value : "MonitorFileExt" === i[0] && (this.monitorFileExts = t[1].value))
        },
        onBrowserConfigMonitorDomainChange: function(e) {
            if (e) {
                this.monitorDomains = e;
                var t = this;
                chrome.windows.getAll({
                    populate: !0
                }, function(e) {
                    for (var i in e)
                        for (var n in e[i].tabs)
                            e[i].tabs[n].id >= 0 && chrome.tabs.sendMessage(e[i].tabs[n].id, {
                                name: "UpdateMonitorDomains",
                                monitorDomains: t.monitorDomains
                            })
                }),
                this.enumTabSetEnabled(this.pluginEnabled)
            }
        },
        onGetPluginEnabled: function(e, t, i) {
            do {
                if (!e)
                    break;
                this.pluginEnabled = t[0].retVal,
                this.updateContextMenu(this.pluginEnabled),
                this.pluginEnabled ? this.setToolbarEnableStatus() : this.setToolbarDisableStatus(),
                a.init(),
                r.postMessage("GetBlackListPages", [], this, this.onGetBlackListPages),
                r.postMessage("GetFiters", ["MonitorDemain"], this, this.onGetFiters),
                r.postMessage("GetFiters", ["FilterDemain"], this, this.onGetFiters),
                r.postMessage("GetFiters", ["MonitorFileExt"], this, this.onGetFiters),
                r.postMessage("GetIsMonitorProtocol", ["MonitorEmule"], this, this.onGetIsMonitorProtocol),
                r.postMessage("GetIsMonitorProtocol", ["MonitorMagnet"], this, this.onGetIsMonitorProtocol),
                r.postMessage("GetIsMonitorProtocol", ["MonitorTradition"], this, this.onGetIsMonitorProtocol),
                r.postMessage("GetIsMonitorProtocol", ["MonitorIE"], this, this.onGetIsMonitorProtocol),
                s(1022, 916, "value1=" + (this.pluginEnabled ? "1" : "0"))
            } while (0)
        },
        trackEvent: function(e, t, i) {
            s(e, t, i)
        },
        feedback: function() {
            r.postMessage("GetThunderInfo", [], void 0, function(e, t, i) {
                var n = ""
                  , o = "";
                e && (n = t[0].peerId,
                o = t[0].thunderVersion);
                var r = "http://misc-xl9-ssl.xunlei.com/client/view/dist/1.0/feedback.html?version=" + o + "&pid=" + n;
                chrome.tabs.create({
                    url: r
                }, function() {})
            })
        },
        getVideoConfigs: function(e) {
            o({
                url: "http://static-xl.a.88cdn.com/json/xl_chrome_ext_config.json",
                type: "GET",
                success: function(t) {
                    e(0, t)
                },
                error: function(t) {
                    e(-1)
                }
            })
        },
        pollCheckNativeMessageConnected: function() {
            do {
                if (this.exceptionTimerId)
                    break;
                this.exceptionTimerId = setInterval(()=>{
                    r.connect() && (clearInterval(this.exceptionTimerId),
                    this.exceptionTimerId = void 0,
                    this.exception = !1,
                    r.postMessage("GetPluginEnabled", [], this, this.onGetPluginEnabled),
                    chrome.storage.local.get("video_monitor", e=>{
                        void 0 === e.video_monitor ? this.monitorVideo = !0 : this.monitorVideo = e.video_monitor
                    }
                    ),
                    chrome.storage.local.get("multi_select_shortcut_enable", e=>{
                        this.isShortcutEnable = !0;
                        do {
                            if (!e)
                                break;
                            if (void 0 === e.multi_select_shortcut_enable)
                                break;
                            this.isShortcutEnable = e.multi_select_shortcut_enable
                        } while (0)
                    }
                    ))
                }
                , 5e3)
            } while (0)
        },
        onDisconnect: function(e) {
            if (!e) {
                this.pluginEnabled = !1,
                this.exception = !0,
                this.monitorVideo = !1,
                this.setToolbarExceptionStatus();
                var t = this;
                chrome.tabs.getAllInWindow(null, function(e) {
                    if (e)
                        for (var i in e)
                            e[i].id >= 0 && chrome.tabs.sendMessage(e[i].id, {
                                name: "UpdatePluginEnabled",
                                enable: t.pluginEnabled,
                                exception: t.exception
                            })
                }),
                this.pollCheckNativeMessageConnected()
            }
        },
        init: function() {
            r.attachDisconnectEvent(this, this.onDisconnect);
            var e = r.connect();
            do {
                if (e && r.postMessage("GetPluginEnabled", [], this, this.onGetPluginEnabled)) {
                    chrome.storage.local.get("video_monitor", e=>{
                        void 0 === e.video_monitor ? this.monitorVideo = !0 : this.monitorVideo = e.video_monitor
                    }
                    ),
                    chrome.storage.local.get("multi_select_shortcut_enable", e=>{
                        this.isShortcutEnable = !0;
                        do {
                            if (!e)
                                break;
                            if (void 0 === e.multi_select_shortcut_enable)
                                break;
                            this.isShortcutEnable = e.multi_select_shortcut_enable
                        } while (0)
                    }
                    ),
                    r.postMessage("GetThunderInfo", [], void 0, function(e, t, i) {
                        e || s(1022, 919)
                    });
                    break
                }
                this.pluginEnabled = !1,
                this.exception = !0,
                this.monitorVideo = !1,
                this.isShortcutEnable = !1,
                this.setToolbarExceptionStatus(),
                s(1022, 919)
            } while (0);
            this.createContextMenu(!1),
            this.registerEventListener();
            var t = this;
            this.getVideoConfigs(function(e, i) {
                t.videoConfigGetted = !0,
                t.videoConfigs = i
            }),
            s(1022, 920)
        }
    };
    var u = new c;
    u.init(),
    window.trackEvent = function(e, t, i) {
        u.trackEvent(e, t, i)
    }
    ,
    window.onFeedback = function() {
        u.feedback()
    }
    ,
    window.setPluginEnabled = function(e) {
        u.setPluginEnabled(e)
    }
    ,
    window.removeBlackListPage = function(e, t) {
        u.removeBlackListPage(e, t)
    }
    ,
    window.removeBlackListWebsite = function(e, t, i, n) {
        u.removeBlackListWebsite(e, t, i, n)
    }
    ,
    window.addBlackListPage = function(e, t) {
        u.addBlackListPage(e, t)
    }
    ,
    window.addBlackListWebsite = function(e, t) {
        u.addBlackListWebsite(e, t)
    }
    ,
    window.isException = function() {
        return u.exception
    }
    ,
    window.isPluginEnabled = function() {
        return u.pluginEnabled
    }
    ,
    window.isVideoMonitor = function() {
        return u.monitorVideo
    }
    ,
    window.setMonitorVideoTags = function(e) {
        u.setMonitorVideoTags(e)
    }
    ,
    window.isMultiSelectShortcutEnable = function() {
        return u.isShortcutEnable
    }
    ,
    window.setMultiSelectShortcutEnable = function(e) {
        u.setMultiSelectShortcutEnable(e)
    }
    ,
    window.isUseChromeDownloadAPI = function() {
        return u.bUseChromeDownloadAPI
    }
    ,
    window.isMonitorDomain = function(e) {
        return u.isMonitorDomain(e)
    }
    ,
    window.checkIsPageInUserBlackList = function(e) {
        return u.checkIsPageInUserBlackList(e)
    }
    ,
    window.enterMultiDownload = function(e, t) {
        return u.enterMultiDownload(e, t)
    }
}
, function(e, t, i) {
    var {Ajax: n, versionCompare: o} = i(0)
      , {XLNativeMessage: r} = i(1);
    function s() {
        this.listeners = [],
        this.valid = !1
    }
    s.prototype = {
        isThunderXSupportWatch: function(e, t) {
            var i = this;
            r.postMessage("GetThunderInfo", [], void 0, function(n, r, s) {
                var a = "";
                n && (a = r[0].thunderVersion);
                var l = !1;
                a.length > 0 && o(a, "10.1.24.578") >= 0 && (l = !0),
                i.valid = l,
                "function" == typeof t && t.apply(e, [l])
            })
        },
        setBHOConfig: function(e, t, i) {
            if (this.valid) {
                for (var o = 0; o < this.listeners.length; ++o)
                    this.listeners[o].section === e && this.listeners[o].key === t && (this.listeners[o].currentValue = i);
                var r = "http://127.0.0.1:5021/setbhoconfig?section=" + e + "&key=" + t + "&value=" + i;
                n({
                    url: r,
                    type: "GET",
                    success: function(e) {},
                    error: function(e) {}
                })
            }
        },
        setConfig: function(e, t, i) {
            if (this.valid) {
                var o = "http://127.0.0.1:5021/setconfig";
                n({
                    url: o,
                    type: "POST",
                    data: {
                        section: e,
                        key: t,
                        value: i
                    },
                    success: function(e) {},
                    error: function(e) {}
                })
            }
        },
        query: function(e, t, i) {
            var o = "http://127.0.0.1:5021/getbhoconfig?section=" + e.section + "&key=" + e.key;
            n({
                url: o,
                type: "GET",
                success: function(i) {
                    if (i && 0 === i.code && i.value && i.value !== e.currentValue) {
                        var n = e.currentValue;
                        e.currentValue = i.value,
                        e.cb.apply(e.l, [i.value, n])
                    }
                    "function" == typeof t && t(i)
                },
                error: function(e) {
                    "function" == typeof i && i(e)
                }
            })
        },
        onQueryTimer: function() {
            this.queryResultCount = 0,
            this.queryCount = this.listeners.length;
            for (var e = this, t = 0; t < this.listeners.length; ++t) {
                var i = this.listeners[t];
                this.query(i, function() {
                    e.queryResultCount++,
                    e.queryCount === e.queryResultCount && e.setQueryTimer()
                }, function() {
                    e.queryResultCount++,
                    e.queryCount === e.queryResultCount && e.setQueryTimer()
                })
            }
        },
        setQueryTimer: function() {
            do {
                if (this.listeners.length <= 0)
                    break;
                if (this.timer)
                    break;
                var e = this;
                this.timer = setTimeout(function() {
                    e.onQueryTimer(),
                    e.timer = null
                }, 5e3)
            } while (0)
        },
        addWatch: function(e, t, i, n, o) {
            if (this.valid) {
                for (var r = 0; r < this.listeners.length; ++r)
                    if (this.listeners[r].l === e && this.listeners[r].cb === t && this.listeners[r].section === i && this.listeners[r].key === n)
                        return;
                this.listeners.push({
                    l: e,
                    cb: t,
                    section: i,
                    key: n,
                    currentValue: o
                }),
                this.setQueryTimer()
            }
        },
        updateWatchValue: function(e, t, i, n, o) {
            for (var r = 0; r < this.listeners.length; ++r)
                if (this.listeners[r].l === e && this.listeners[r].cb === t && this.listeners[r].section === i && this.listeners[r].key === n) {
                    this.listeners[r].currentValue = o;
                    break
                }
        },
        removeWatchValue: function(e, t, i, n) {
            for (var o = this.listeners.length - 1; o >= 0; --o)
                this.listeners[o].l !== e || this.listeners[o].cb !== t || i && this.listeners[o].section !== i || n && this.listeners[o].key !== n || this.listeners.splice(o, 1);
            this.listeners.length <= 0 && this.timer && (clearTimeout(this.timer),
            this.timer = null)
        },
        init: function() {
            this.isThunderXSupportWatch()
        }
    };
    var a = new s;
    e.exports = {
        XLBHOConfigWatcher: a
    }
}
]);
//# sourceMappingURL=background.js.map