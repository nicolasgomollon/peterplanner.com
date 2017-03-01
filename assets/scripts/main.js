function evernote_post(bookmark_id) {
	event.preventDefault();
	window.resetInterface();

	$('.evernote_confirm').animate({
		top: '-5px'
	}, 350, function() {
		setTimeout(function() {
			$('.evernote_confirm').animate({
				top: '-60px'
			}, 250);
		}, 900);
	});

	form = bookmark_id == undefined ? '.share_to_evernote_form' : '.share_to_evernote_form_' + bookmark_id;
	data = $(form).serialize()
	$.post(
		'/user/share_to_evernote',
		data
	).success(function() {}).error(function() {});

	return false;
}


(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;
				if (!u && a) return a(o, !0);
				if (i) return i(o, !0);
				throw new Error("Cannot find module '" + o + "'")
			}
			var f = n[o] = {
				exports: {}
			};
			t[o][0].call(f.exports, function(e) {
				var n = t[o][1][e];
				return s(n ? n : e)
			}, f, f.exports, e, t, n, r)
		}
		return n[o].exports
	}
	var i = typeof require == "function" && require;
	for (var o = 0; o < r.length; o++) s(r[o]);
	return s
})({
	1: [function(require, module, exports) {
		(function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
			(function() {
				'use strict';
				var __slice = [].slice,
					__indexOf = [].indexOf || function(item) {
						for (var i = 0, l = this.length; i < l; i++) {
							if (i in this && this[i] === item) return i;
						}
						return -1;
					};

				$(document).ready(function() {
					var $loader, addFolder, android, articleItemSelectHandler, article_multiselect_enabled, article_select_handlers_timeout, attachFolderDragDropEvents, attachSettingsHandlers, batchModifyArticles, chrome, createCookie, deselectAllArticles, destroyTouchScrollers, dismissModal, drag_data, escapeString, fireBatchOperation, firefox, footer_height, forceTouchOriginScrollPosition, fullscreen, gaLog, initTouchScrollers, initialize, ios, ipad, iphone, isDesktopOS, isDragAndDropCapable, isOneColumn, isPopoverActive, isTouchDevice, isTouchOS, markFolderDropPosition, moveFolderPosition, onViewportResize, openModal, page_header_height, popover_bodystate, refreshTouchScrollers, removeAllArticlesFromView, removeArticleFromView, remove_article_animation_duration, resetFolderAdd, resetInterface, safari, selectAllArticles, selected_articles, shouldEnableDragAndDrop, showHide, side_nav_height, toggleArticleSelect, touch_scroller_main, touch_scroller_side, ua, updateArticleItemSelectHandlers, updateArticlePopoverPlacement, updateEmptyNotice, updatePageHeaderMode, updateScrollableMaxHeight, useTransformScroll, webkit, window_height, window_width;
					createCookie = function(name, value, days) {
						var cookie, date, expires;
						if (days) {
							date = new Date();
							date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
							expires = "; expires=" + date.toGMTString();
						} else {
							expires = "";
						}
						cookie = name + "=" + escape(value) + expires + "; path=/";
						return document.cookie = cookie;
					};
					ua = navigator.userAgent;
					iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod');
					ipad = ~ua.indexOf('iPad');
					ios = iphone || ipad;
					chrome = ~ua.indexOf('Chrome');
					firefox = ~ua.indexOf('Firefox');
					safari = ~ua.indexOf("Safari");
					if (chrome && safari) {
						safari = false;
					}
					fullscreen = window.navigator.standalone;
					android = ~ua.indexOf('Android');
					webkit = ~ua.indexOf('WebKit');
					touch_scroller_main = null;
					touch_scroller_side = null;
					window.webkit = webkit;
					window_width = $(window).width();
					window_height = $(window).height();
					side_nav_height = $('#side_nav').outerHeight();
					page_header_height = $('.page_header').outerHeight();
					footer_height = $('#footer').outerHeight();
					popover_bodystate = null;
					article_multiselect_enabled = false;
					selected_articles = [];
					article_select_handlers_timeout = null;
					isDragAndDropCapable = $('html').hasClass('draganddrop');
					isTouchDevice = $('html').hasClass('touch');
					isTouchOS = ios || android;
					isDesktopOS = !isTouchOS;
					remove_article_animation_duration = 600;
					isOneColumn = function() {
						return $(window).width() < 752;
					};
					useTransformScroll = function() {
						return isTouchOS || isOneColumn();
					};
					shouldEnableDragAndDrop = function() {
						return isDragAndDropCapable && !(isTouchOS || isTouchDevice);
					};
					if (ios) {
						$('body').addClass('ios');
					}
					if (android) {
						$('body').addClass('android');
					}
					if (isDesktopOS) {
						$('body').addClass('desktop_os');
					}
					if (ipad) {
						$('body').addClass('ipad_mode');
					}
					if (chrome) {
						$('body').addClass('chrome_mode');
					}
					if (safari) {
						$('body').addClass('safari_mode');
					}
					if (firefox) {
						$('body').addClass('firefox_mode');
					}
					if (useTransformScroll()) {
						$('body').addClass('transform_scroll_mode');
					}
					initialize = function() {
						onViewportResize();
						$(window).resize(onViewportResize);
						attachFolderDragDropEvents('.js_folder_item');
						if (!useTransformScroll()) {
							$('.js_tooltip').tooltip({
								trigger: 'hover'
							});
							$('.js_tooltip_decorative').tooltip({
								trigger: 'manual'
							});
							$('.js_tooltip_decorative').tooltip('show');
						}
						return $('body').removeClass('preload');
					};
					onViewportResize = function() {
						window_width = $(window).width();
						window_height = $(window).height();
						resetInterface();
						initTouchScrollers();
						updateScrollableMaxHeight();
						setTimeout((function() {
							return refreshTouchScrollers();
						}), 300);
						if (isOneColumn()) {
							$('body').addClass('mobile_mode');
						} else {
							$('body').removeClass('mobile_mode');
							$('body').removeClass('mobile_menu');
							$('body').removeClass('mobile_edit_mode');
						}
						if (useTransformScroll()) {
							initTouchScrollers();
						} else {
							destroyTouchScrollers();
						}
						if (isTouchDevice) {
							forceTouchOriginScrollPosition();
						}
						if (article_select_handlers_timeout !== null) {
							clearTimeout(article_select_handlers_timeout);
							article_select_handlers_timeout = null;
						}
						return article_select_handlers_timeout = setTimeout((function() {
							updateArticleItemSelectHandlers();
							clearTimeout(article_select_handlers_timeout);
							return article_select_handlers_timeout = null;
						}), 1000);
					};
					gaLog = function() {
						var bins;
						bins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
						if (!bins || bins.length <= 1) {
							return false;
						}
						bins.unshift('event');
						bins.unshift('send');
						window.ga.apply(null, bins);
						return true;
					};
					initTouchScrollers = function() {
						if (useTransformScroll() && touch_scroller_main === null) {
							if ($('#main_container').length > 0) {
								touch_scroller_main = new IScroll('#main_container', {
									mouseWheel: true,
									shrinkScrollbars: 'scale',
									click: true,
									tap: false,
									fadeScrollbars: true,
									indicators: {
										el: '#scroll_indicator_wrapper',
										fade: true,
										ignoreBoundaries: false,
										interactive: false,
										listenX: false,
										listenY: true,
										customStyle: true,
										resize: true,
										shrink: false,
										speedRatioX: 0,
										speedRatioY: 0
									}
								});
							}
							if ($('#side_nav').length > 0) {
								touch_scroller_side = new IScroll('#side_nav', {
									mouseWheel: true,
									shrinkScrollbars: 'scale',
									tap: false,
									click: true,
									fadeScrollbars: true,
									indicators: {
										el: '#scroll_indicator_side_wrapper',
										fade: true,
										ignoreBoundaries: false,
										interactive: false,
										listenX: false,
										listenY: true,
										customStyle: true,
										resize: true,
										shrink: false,
										speedRatioX: 0,
										speedRatioY: 0
									}
								});
							}
							if (touch_scroller_main || touch_scroller_side) {
								return document.addEventListener('touchmove', (function(e) {
									return e.preventDefault();
								}), false);
							}
						}
					};
					destroyTouchScrollers = function() {
						if (touch_scroller_main !== null) {
							touch_scroller_main.destroy();
							touch_scroller_main = null;
						}
						if (touch_scroller_side !== null) {
							touch_scroller_side.destroy();
							return touch_scroller_side = null;
						}
					};
					refreshTouchScrollers = function() {
						return setTimeout((function() {
							if (touch_scroller_main !== null) {
								touch_scroller_main.refresh();
							}
							if (touch_scroller_side !== null) {
								return touch_scroller_side.refresh();
							}
						}), 200);
					};
					updateScrollableMaxHeight = function() {
						var max_height;
						if ($('#side_nav').length > 0) {
							if (isOneColumn()) {
								max_height = $(window).height();
								$('#side_nav').css('height', "" + max_height + "px");
							} else if (useTransformScroll()) {
								max_height = $(window).height() - 140;
								$('#side_nav').css('height', "" + max_height + "px");
							} else {
								max_height = $(window).height() - 110;
								$('#side_nav').css('height', "" + max_height + "px");
							}
						}
						if ($('#main_container').length > 0) {
							if (useTransformScroll()) {
								max_height = $(window).height();
								$('#main_container').css('height', "" + max_height + "px");
							} else if (isOneColumn()) {
								$('#main_container').css('height', "auto");
							} else {
								$('#main_container').css('height', "auto");
							}
						}
						return refreshTouchScrollers();
					};
					isPopoverActive = function(name) {
						if (name == null) {
							name = '_popover';
						}
						return $('body').attr('class').indexOf(name) !== -1;
					};
					resetInterface = function() {
						$('body').removeClass(popover_bodystate);
						$('.js_popover').popover('hide');
						$('.article_item').removeClass('popover_active');
						$('#folder_inline_add').removeClass('active');
						return popover_bodystate = null;
					};
					window.resetInterface = resetInterface;
					forceTouchOriginScrollPosition = function() {
						if (isTouchDevice) {
							return setTimeout((function() {
								return window.scrollTo(0, 0);
							}), 0);
						}
					};
					updateArticleItemSelectHandlers = function() {
						if (isOneColumn() && !$('body').hasClass('mobile_edit_mode')) {
							if (article_multiselect_enabled) {
								article_multiselect_enabled = false;
								$('.js_article_item').off('click', articleItemSelectHandler);
								return $('.js_article_item').each(function(index) {
									return toggleArticleSelect.bind(this)(void 0, false, true);
								});
							}
						} else {
							if (!article_multiselect_enabled) {
								article_multiselect_enabled = true;
								$('.js_article_item').off('click', articleItemSelectHandler);
								return $('.js_article_item').on('click', articleItemSelectHandler);
							}
						}
					};
					articleItemSelectHandler = function(e) {
						if (isPopoverActive()) {
							resetInterface();
							return;
						}
						resetInterface();
						return toggleArticleSelect.bind(this)();
					};
					$('body').on('click', function() {
						resetInterface();
						$('.evernote_share_menu').removeClass('active');
						return true;
					});
					$('.follow_toggle').on('click', function(e) {
						var data;
						e.preventDefault();
						data = $(this).parent().serialize();
						if ($(this).hasClass('unfollow_button')) {
							data += '&unfollow=true';
						}
						$(this).toggleClass('follow_button');
						$(this).toggleClass('unfollow_button');
						$(this).blur();
						return $.post('/user/friends', data);
					});
					$('.js_galog').on('click submit', function(e) {
						var b, bins;
						bins = $(this).attr('data-bins');
						bins = (function() {
							var _i, _len, _ref, _results;
							_ref = bins.split(',');
							_results = [];
							for (_i = 0, _len = _ref.length; _i < _len; _i++) {
								b = _ref[_i];
								_results.push(b.trim());
							}
							return _results;
						})();
						return gaLog.apply(null, bins);
					});
					if (!isTouchDevice) {
						$('#side_nav').hover((function(e) {
							return $(this).css('overflow-y', 'auto');
						}), function(e) {
							return $(this).css('overflow-y', 'hidden');
						});
					}
					$('.js_to_top').on('touchstart click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						if (touch_scroller_main !== null) {
							touch_scroller_main.scrollTo(0, 0, 800, IScroll.utils.ease.circular);
						}
						return false;
					});
					$('.js_mobile_edit_engage').on('click', function(e) {
						$('body').toggleClass('mobile_edit_mode');
						updateArticleItemSelectHandlers();
						return false;
					});
					$('.mobile_menu_button').on('click', function() {
						return $('body').toggleClass('mobile_menu');
					});
					$('#mobile_cover').on('click', function() {
						return $('body').removeClass('mobile_menu');
					});
					$('.js_close').on('click', function(e) {
						var options, props, target;
						e.preventDefault();
						e.stopPropagation();
						target = $(this).attr('data-dismiss-target');
						props = {
							opacity: 0
						};
						options = {
							duration: 300,
							complete: (function(_this) {
								return function() {
									return $(_this).closest(target).remove();
								};
							})(this)
						};
						$(this).closest(target).animate(props, options);
						return false;
					});
					$('.js_popover').popover({
						animation: false,
						html: true,
						trigger: 'manual',
						placement: (function() {
							if (($(this)[0].$element.offset().top - $(window).scrollTop()) < (window_height / 2)) {
								return 'bottom';
							}
							return 'top';
						}),
						content: (function() {
							var target;
							target = $(this).attr('data-target');
							return $(target).html();
						})
					});
					$('.js_popover').on('click', function(e) {
						var new_popover_bodystate;
						e.preventDefault();
						e.stopPropagation();
						new_popover_bodystate = $(this).attr('data-bodystate');
						if (new_popover_bodystate === popover_bodystate) {
							resetInterface();
							return false;
						}
						resetInterface();
						$(this).closest('.article_item').addClass('popover_active');
						popover_bodystate = new_popover_bodystate;
						$('body').addClass(popover_bodystate);
						$(this).popover('show');
						$('.popover').on('click', function(e) {
							return e.stopPropagation();
						});
						return false;
					});
					showHide = function(e) {
						var animate, hide, hide_class, options, props, show, show_animation, show_class;
						if ($(e.target).is("a")) {
							e.preventDefault();
						}
						show = $(this).data('show');
						hide = $(this).data('hide');
						animate = $(this).data('animate');
						show_class = $(this).data('show-class') ? $(this).data('show-class') : 'show';
						hide_class = $(this).data('hide-class') ? $(this).data('hide-class') : 'hidden';
						if (animate) {
							if (show && $(show).hasClass(hide_class)) {
								$(show).css('opacity', '0');
								$(show).removeClass(hide_class).addClass(show_class);
								show_animation = function() {
									var options, props;
									props = {
										'opacity': 1
									};
									options = {
										duration: 800
									};
									({
										complete: function() {
											return refreshTouchScrollers();
										}
									});
									$(show).animate(props, options);
									return $(hide).addClass(hide_class).removeClass(show_class);
								};
								if (hide) {
									props = {
										'opacity': 0
									};
									options = {
										duration: 200,
										complete: function() {
											show_animation();
											return refreshTouchScrollers();
										}
									};
									$(hide).animate(props, options);
								} else {
									show_animation();
								}
							}
						} else {
							if (show) {
								$(show).removeClass(hide_class).addClass(show_class);
							}
							if (hide) {
								$(hide).addClass(hide_class).removeClass(show_class);
							}
						}
						return false;
					};
					$('.js_folder_edit').on('click', function(e) {
						var folder_id;
						folder_id = $(this).data('folder-id');
						$('#folder_delete_link').attr('data-folder-id', folder_id);
						$('#folder_delete_link').attr('href', "/delete_folder?folder_id=" + folder_id);
						$('#folder_edit_form').attr('action', $(this).data('folder-action'));
						$('#folder_edit_title').val($(this).data('folder-title'));
						if ($(this).data('folder-sync-to-iphone')) {
							$('#folder_sync_to_iphone').prop('checked', true);
						}
						if (!$(this).data('folder-sync-to-iphone')) {
							$('#folder_sync_to_iphone').prop('checked', false);
						}
						return false;
					});
					$('.js_folder_delete').on('click', function(e) {
						if (confirm("Are you sure you want to delete this folder and all of its contents?")) {
							window.location.href = $(this).attr('href');
						}
						return false;
					});
					updatePageHeaderMode = function() {
						if (selected_articles.length <= 0) {
							$('#multi_actions_available').removeClass('mode_active');
							$('#multi_actions_available_mobile').removeClass('mode_active');
							$('#search_available').addClass('mode_active');
							return $('#multi_select_count').addClass('hidden');
						} else {
							$('#multi_select_count_value').text(selected_articles.length);
							$('#multi_select_count_value_mobile').text(selected_articles.length);
							$('#search_available').removeClass('mode_active');
							$('#multi_actions_available').addClass('mode_active');
							$('#multi_actions_available_mobile').addClass('mode_active');
							return $('#multi_select_count').removeClass('hidden');
						}
					};
					toggleArticleSelect = function(article_id, force_select, force_deselect) {
						var selected;
						if (force_select == null) {
							force_select = false;
						}
						if (force_deselect == null) {
							force_deselect = false;
						}
						article_id = article_id === void 0 ? parseInt($(this).attr('data-article-id')) : article_id;
						selected = $(this).attr('data-selected');
						if (!force_deselect && (selected === 'false' || force_select)) {
							$(this).attr('data-selected', 'true');
							$(this).addClass('selected');
							if (__indexOf.call(selected_articles, article_id) < 0) {
								selected_articles.push(article_id);
							}
						}
						if (!force_select && (selected === 'true' || force_deselect)) {
							$(this).attr('data-selected', 'false');
							$(this).removeClass('selected');
							selected_articles = selected_articles.filter(function(id) {
								return id !== article_id;
							});
						}
						return updatePageHeaderMode();
					};
					selectAllArticles = function() {
						return $('.article_item').each(function(index) {
							return toggleArticleSelect.bind(this)(void 0, true, false);
						});
					};
					deselectAllArticles = function() {
						return $('.article_item').each(function(index) {
							return toggleArticleSelect.bind(this)(void 0, false, true);
						});
					};
					$('.js_select_all_articles').on('click', function(e) {
						e.preventDefault();
						return selectAllArticles();
					});
					$('.js_deselect_all_articles').on('click', function(e) {
						e.preventDefault();
						return deselectAllArticles();
					});
					$('.js_title_row a, .js_domain_linkout, .js_highlight_text').on('click', function(e) {
						if ($('.article_item').hasClass('selected') || $('body').hasClass('mobile_edit_mode')) {
							e.preventDefault();
							return false;
						} else {
							e.stopPropagation();
							if (isTouchDevice) {
								window.location.href = $(this).attr('href');
							}
							return true;
						}
					});
					removeArticleFromView = function(article_id) {
						var $article_item;
						$article_item = $("#article_" + article_id);
						$article_item.addClass('move_left');
						return setTimeout((function() {
							$article_item.remove();
							updateArticlePopoverPlacement('.article_item');
							updateEmptyNotice();
							return refreshTouchScrollers();
						}), remove_article_animation_duration);
					};
					removeAllArticlesFromView = function() {
						$('.article_item').addClass('move_left');
						selected_articles = [];
						return setTimeout((function() {
							$('.article_item').remove();
							updateArticlePopoverPlacement('.article_item');
							updateEmptyNotice();
							return refreshTouchScrollers();
						}), remove_article_animation_duration);
					};
					updateArticlePopoverPlacement = function(selector) {
						return $(selector).each(function(index) {
							if (index < 2) {
								return $(this).find('.js_popover').attr('data-placement', 'bottom');
							} else {
								return $(this).find('.js_popover').attr('data-placement', 'top');
							}
						});
					};
					updateEmptyNotice = function() {
						if ($('.article_item').length > 0) {
							return $('#empty_notice').removeClass('show');
						} else {
							return $('#empty_notice').addClass('show');
						}
					};
					fireBatchOperation = function(e) {
						var action, folder_id;
						e.preventDefault();
						if (selected_articles.length <= 0) {
							return;
						}
						action = $(this).attr('data-action');
						folder_id = $(this).attr('data-folder-id');
						folder_id = folder_id === void 0 ? false : folder_id;
						return batchModifyArticles(action, selected_articles, folder_id);
					};
					batchModifyArticles = function(action, articles, folder_id) {
						var $element, action_name, count, data, error, event, href, noun, success;
						if (folder_id == null) {
							folder_id = false;
						}
						if (typeof articles === 'object' && articles.currentTarget) {
							event = articles;
							event.preventDefault();
							event.stopPropagation();
							$element = $(event.currentTarget);
							articles = $element.attr('data-article-id');
							folder_id = $element.attr('data-folder-id');
						}
						articles = typeof articles === 'number' ? [articles] : articles;
						articles = typeof articles === 'string' ? [parseInt(articles)] : articles;
						if (!(articles instanceof Array)) {
							return false;
						}
						if (action === "archive") {
							href = "/archive_articles";
						} else if (action === "move") {
							if (folder_id === false) {
								return false;
							}
							href = "/move_articles/" + folder_id;
						} else if (action === "unarchive") {
							href = "/unarchive_articles";
						} else if (action === "delete") {
							href = "/delete_articles";
						} else {
							return false;
						}
						action_name = action;
						if (articles.length > 1) {
							action_name = 'bulk ' + action;
						}
						gaLog('unread', action_name);
						resetInterface();
						success = function(response) {
							var article_id, _i, _len;
							deselectAllArticles();
							selected_articles = [];
							for (_i = 0, _len = articles.length; _i < _len; _i++) {
								article_id = articles[_i];
								removeArticleFromView(article_id);
							}
							articles = [];
							return refreshTouchScrollers();
						};
						error = function(response) {
							deselectAllArticles();
							articles = [];
							return selected_articles = [];
						};
						count = articles.length;
						noun = count === 1 ? "article" : "articles";
						count = count === 1 ? "this" : count;
						data = articles;
						if (action !== "delete" || confirm("Are you sure you want to permanently delete " + count + " " + noun + "?")) {
							$.ajax({
								type: "POST",
								url: href,
								data: JSON.stringify(data),
								success: success,
								error: error
							});
						}
						return false;
					};
					$('.js_archive_single').on('click', batchModifyArticles.bind(null, 'archive'));
					$('.js_restore_single').on('click', batchModifyArticles.bind(null, 'unarchive'));
					$('.js_delete_single').on('click', batchModifyArticles.bind(null, 'delete'));
					$('.js_move_single').on('click', batchModifyArticles.bind(null, 'move'));
					$('.js_batch').on('click', function(e) {
						return fireBatchOperation.bind(this)(e);
					});
					$('.js_move_batch_popover').on('shown.bs.popover', function() {
						return $('.popover .js_batch').on('click', function(e) {
							return fireBatchOperation.bind(this)(e);
						});
					});
					$('.js_move_single_popover').on('shown.bs.popover', function() {
						return $('.popover .js_move_single').on('click', function(e) {
							return batchModifyArticles.bind(this, 'move')(e);
						});
					});
					escapeString = function(str) {
						return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
					};
					addFolder = function(folder) {
						var display_title, id, slug, tpl;
						if (folder == null) {
							return;
						}
						id = folder['folder_id'];
						slug = folder['slug'];
						display_title = escapeString(folder['display_title']);
						tpl = "<li id='folder_" + id + "' draggable='true' data-folder-id='" + id + "' class='js_folder_item side_item folder_item droptarget droptarget_folder'> <a href='/u/folder/" + id + "/" + slug + "'> <i class='ipicon ipicon-folder'></i> " + display_title + " </a></li>";
						$('#folders').append(tpl);
						attachFolderDragDropEvents("#folder_" + id);
						return updateScrollableMaxHeight();
					};
					resetFolderAdd = function() {
						var $form, $titleInput;
						$form = $('#folder_inline_add');
						$titleInput = $form.find('input[type=text]');
						$titleInput.val('');
						$titleInput.blur();
						$titleInput.tooltip('destroy');
						return forceTouchOriginScrollPosition();
					};
					$('.js_folder_inline_add_field').on('focus click', function(e) {
						e.stopPropagation();
						$(this).attr('placeholder', 'New Folder');
						return $('#folder_inline_add').addClass('active');
					});
					$('.js_folder_inline_add_field').on('blur', function(e) {
						$(this).attr('placeholder', 'Add Folder');
						$(this).val('');
						return $('#folder_inline_add').removeClass('active');
					});
					$('#folder_inline_add').on('submit', function(e) {
						var $titleInput, data, form_key, href, title;
						e.preventDefault();
						href = $(this).attr('action');
						$titleInput = $(this).find('input[type=text]');
						title = $titleInput.val();
						form_key = $(this).find('input[name=form_key]').val();
						data = {
							"folder[title]": title,
							"ajax": 1,
							"form_key": form_key
						};
						return $.post(href, data).success(function(data) {
							var response, status;
							status = data['status'];
							response = data['response'];
							if (status.code === 200) {
								addFolder(response.folder);
								return resetFolderAdd();
							} else {
								$titleInput.tooltip({
									title: status.errors.join(' '),
									container: 'body',
									trigger: 'focus'
								});
								$titleInput.tooltip('show');
								return $('#folder_inline_add_field').on('keydown', function(e) {
									return $(this).tooltip('destroy');
								});
							}
						}).error(function(response) {});
					});
					$('#folder_inline_add_field').on('blur', function(e) {
						return forceTouchOriginScrollPosition();
					});
					drag_data = {};
					if (shouldEnableDragAndDrop()) {
						$('.js_article_item').on('dragstart', function(e) {
							var aid, article_id, img, _i, _len;
							if (isPopoverActive()) {
								return;
							}
							$('body').addClass('drag_active');
							article_id = parseInt($(this).data('article-id'));
							e.dataTransfer = e.originalEvent.dataTransfer;
							drag_data = {
								folder_id: false,
								article_id: article_id
							};
							$(this).addClass('drag_active');
							for (_i = 0, _len = selected_articles.length; _i < _len; _i++) {
								aid = selected_articles[_i];
								$("#article_" + aid).addClass('drag_active');
							}
							if (e.dataTransfer && e.dataTransfer.setDragImage) {
								img = document.createElement('img');
								if (selected_articles.length <= 1) {
									img.src = $('#drag_image_article_one').attr('src');
								} else if (selected_articles.length === 2) {
									img.src = $('#drag_image_article_two').attr('src');
								} else if (selected_articles.length >= 3) {
									img.src = $('#drag_image_article_three').attr('src');
								}
								return e.dataTransfer.setDragImage(img, 20, 20);
							}
						});
						$('.js_article_item').on('dragend', function(e) {
							e.preventDefault();
							$('.article_item').removeClass('drag_active');
							return $('body').removeClass('drag_active');
						});
						$('#archive_nav, #unread_nav').on('dragleave', function(e) {
							e.preventDefault();
							if (!$(this).hasClass('droptarget')) {
								return;
							}
							return $(this).removeClass('drag_hover');
						});
						$('#archive_nav, #unread_nav').on('dragover dragenter', function(e) {
							e.preventDefault();
							if (!$(this).hasClass('droptarget')) {
								return;
							}
							$(this).addClass('drag_hover');
							e.dataTransfer = e.originalEvent.dataTransfer;
							e.dataTransfer.effectAllowed = 'copy';
							return e.dataTransfer.dropEffect = 'copy';
						});
						$('#unread_nav').on('drop', function(e) {
							var article_id;
							e.preventDefault();
							e.dataTransfer = e.originalEvent.dataTransfer;
							if (drag_data.article_id) {
								article_id = drag_data.article_id;
							}
							$(this).removeClass('drag_hover');
							if (!(article_id && $(this).hasClass('droptarget'))) {
								return;
							}
							if (__indexOf.call(selected_articles, article_id) >= 0) {
								batchModifyArticles('move', selected_articles, '0');
							} else {
								batchModifyArticles('move', article_id, '0');
							}
							return false;
						});
						$('#archive_nav').on('drop', function(e) {
							var article_id;
							e.preventDefault();
							e.dataTransfer = e.originalEvent.dataTransfer;
							if (drag_data.article_id) {
								article_id = drag_data.article_id;
							}
							$(this).removeClass('drag_hover');
							if (!(article_id && $(this).hasClass('droptarget'))) {
								return;
							}
							if (__indexOf.call(selected_articles, article_id) >= 0) {
								batchModifyArticles('archive', selected_articles, '0');
							} else {
								batchModifyArticles('archive', article_id, '0');
							}
							return false;
						});
					}
					moveFolderPosition = function(anchor_folder_id, moving_folder_id, above_anchor) {
						var $anchor_folder, $moving_folder, data, folder_list, href, success;
						if (above_anchor == null) {
							above_anchor = true;
						}
						if (anchor_folder_id === moving_folder_id) {
							return;
						}
						$anchor_folder = $("#folder_" + anchor_folder_id);
						$moving_folder = $("#folder_" + moving_folder_id);
						$moving_folder.remove();
						if (above_anchor) {
							$moving_folder.insertBefore($anchor_folder);
						} else {
							$moving_folder.insertAfter($anchor_folder);
						}
						folder_list = [];
						$('#folders li').each(function(index) {
							return folder_list.push(parseInt($(this).data('folder-id')));
						});
						href = '/set_folder_order';
						data = folder_list;
						success = function(response) {};
						$.ajax({
							type: "POST",
							url: href,
							data: JSON.stringify(data),
							success: success
						});
						return attachFolderDragDropEvents('.js_folder_item');
					};
					markFolderDropPosition = function(e) {
						var diff, height, mouseY, offset, offsetTop;
						offset = $(this).offset();
						height = $(this).height();
						mouseY = e.originalEvent.pageY;
						offsetTop = offset.top;
						diff = (offset.top + height) - mouseY;
						if (diff < (height / 2)) {
							$(this).removeClass('drag_hover_folder_above');
							return $(this).addClass('drag_hover_folder_below');
						} else {
							$(this).removeClass('drag_hover_folder_below');
							return $(this).addClass('drag_hover_folder_above');
						}
					};
					attachFolderDragDropEvents = function(selector) {
						if (shouldEnableDragAndDrop()) {
							$(selector).on('dragstart', function(e) {
								if (isPopoverActive()) {
									return;
								}
								$('body').addClass('drag_active');
								drag_data = {
									article_id: false,
									folder_id: parseInt($(this).data('folder-id'))
								};
								e.dataTransfer = e.originalEvent.dataTransfer;
								e.dataTransfer.effectAllowed = 'move';
								e.dataTransfer.dropEffect = 'move';
								return $(this).addClass('drag_active');
							});
							$(selector).on('dragend', function(e) {
								$('body').removeClass('drag_active');
								$(this).removeClass('drag_active');
								$(selector).removeClass('drag_hover');
								$(selector).removeClass('drag_hover_folder_above');
								return $(selector).removeClass('drag_hover_folder_below');
							});
							$(selector).on('dragleave', function(e) {
								var article_id, folder_id;
								e.preventDefault();
								e.dataTransfer = e.originalEvent.dataTransfer;
								if (drag_data.article_id) {
									article_id = drag_data.article_id;
								}
								if (drag_data.folder_id) {
									folder_id = drag_data.folder_id;
								}
								if (article_id && $(this).hasClass('droptarget')) {
									$(this).removeClass('drag_hover');
								}
								if (folder_id && $(this).hasClass('droptarget_folder')) {
									$(this).removeClass('drag_hover_folder_above');
									return $(this).removeClass('drag_hover_folder_below');
								}
							});
							$(selector).on('dragenter', function(e) {
								var article_id, folder_id;
								e.preventDefault();
								e.dataTransfer = e.originalEvent.dataTransfer;
								e.dataTransfer.effectAllowed = 'move';
								e.dataTransfer.dropEffect = 'move';
								if (drag_data.article_id) {
									article_id = drag_data.article_id;
								}
								if (drag_data.folder_id) {
									folder_id = drag_data.folder_id;
								}
								if (article_id && $(this).hasClass('droptarget')) {
									return $(this).addClass('drag_hover');
								} else if (folder_id && $(this).hasClass('droptarget_folder')) {
									return markFolderDropPosition.bind(this)(e);
								}
							});
							$(selector).on('dragover', function(e) {
								var article_id, folder_id;
								e.preventDefault();
								if (drag_data.article_id) {
									article_id = drag_data.article_id;
								}
								if (drag_data.folder_id) {
									folder_id = drag_data.folder_id;
								}
								if (article_id && $(this).hasClass('droptarget')) {
									return $(this).addClass('drag_hover');
								} else if (folder_id && $(this).hasClass('droptarget_folder')) {
									e.dataTransfer = e.originalEvent.dataTransfer;
									e.dataTransfer.effectAllowed = 'move';
									e.dataTransfer.dropEffect = 'move';
									return markFolderDropPosition.bind(this)(e);
								}
							});
							$(selector).on('drag', function(e) {
								return e.preventDefault();
							});
							return $(selector).on('drop', function(e) {
								var above_anchor, anchor_folder_id, article_id, folder_id, target_folder_id;
								e.preventDefault();
								e.dataTransfer = e.originalEvent.dataTransfer;
								e.dataTransfer.effectAllowed = 'move';
								e.dataTransfer.dropEffect = 'move';
								if (drag_data.article_id) {
									article_id = drag_data.article_id;
								}
								if (drag_data.folder_id) {
									folder_id = drag_data.folder_id;
								}
								$(selector).removeClass('drag_active');
								$(selector).removeClass('drag_hover');
								if (article_id && $(this).hasClass('droptarget')) {
									target_folder_id = $(this).data('folder-id');
									if (__indexOf.call(selected_articles, article_id) >= 0) {
										batchModifyArticles('move', selected_articles, target_folder_id);
									} else {
										batchModifyArticles('move', article_id, target_folder_id);
									}
									return false;
								} else if (folder_id && $(this).hasClass('droptarget_folder')) {
									anchor_folder_id = $(this).data('folder-id');
									above_anchor = $(this).hasClass('drag_hover_folder_above');
									moveFolderPosition(anchor_folder_id, folder_id, above_anchor);
								}
								drag_data = {};
								$(this).removeClass('drag_hover').removeClass('drag_hover_folder_above').removeClass('drag_hover_folder_below');
								return $('body').removeClass('drag_active');
							});
						}
					};
					if (window.onorientationchange) {
						window.addEventListener('orientationchange', (function(e) {
							return setTimeout((function() {
								resetInterface();
								updateScrollableMaxHeight();
								refreshTouchScrollers();
								updateArticleItemSelectHandlers();
								return forceTouchOriginScrollPosition();
							}), 200);
						}), false);
					}
					$('.js_select_all').on('click', function(e) {
						return $(this).select();
					});
					$('.js_show_hide').on('click', function(e) {
						return showHide.bind(this)(e);
					});
					$('.js_settings_popover').on('shown.bs.popover', function() {
						return attachSettingsHandlers('.popover');
					});
					attachSettingsHandlers = function(parent_selector) {
						if (parent_selector == null) {
							parent_selector = '.popover';
						}
						$("" + parent_selector + " .js_swatch").on('click', function(e) {
							var modes, new_mode, remove_modes;
							new_mode = $(this).data('color-mode');
							if ($('body').hasClass(new_mode)) {
								return false;
							}
							$('.js_swatch').removeClass('active');
							$(".js_swatch[data-color-mode=" + new_mode + "]").addClass('active');
							$('body').addClass('themeswap');
							modes = ['lightmode', 'stormmode', 'sepiamode', 'darkmode'];
							remove_modes = modes.filter(function(mode) {
								return mode !== new_mode;
							});
							$('body').removeClass(remove_modes.join(' '));
							$('body').addClass(new_mode);
							gaLog('unread', 'theme change', new_mode);
							createCookie('iptcolor', new_mode, 3650);
							return false;
						});
						$("" + parent_selector + " .js_thumbnail_toggle").on('click', function(e) {
							e.preventDefault();
							if ($('body').hasClass('thumbnails')) {
								gaLog('thumbnails', 'disabled');
								$('body').removeClass('thumbnails');
								createCookie('thumbnails', 'disabled', 3650);
							} else {
								gaLog('thumbnails', 'enabled');
								$('body').addClass('thumbnails');
								createCookie('thumbnails', 'enabled', 3650);
							}
							resetInterface();
							return false;
						});
						$("" + parent_selector + " .js_listview_toggle").on('click', function(e) {
							e.preventDefault();
							if ($('body').hasClass('condensed')) {
								gaLog('unread', 'expanded mode');
								$('body').removeClass('condensed').addClass('expanded');
								createCookie('list_toggle', 'expanded', 3650);
							} else {
								gaLog('unread', 'condensed mode');
								$('body').removeClass('expanded').addClass('condensed');
								createCookie('list_toggle', 'condensed', 3650);
							}
							resetInterface();
							return false;
						});
						$("" + parent_selector + " .open_modal").on('click', function(e) {
							return openModal.bind(this)(e);
						});
						$("" + parent_selector + " .js_archive_all").on('click', function(e) {
							var data, href;
							href = $(this).data('action');
							if (confirm("Are you sure you want to archive all items in this folder?")) {
								data = "ajax=1";
								resetInterface();
								$.post(href, data).success(function(response) {
									gaLog('unread', 'archive all');
									removeAllArticlesFromView();
									return window.location.href = window.location.href;
								}).error(function(response) {});
							}
							return false;
						});
						return $("" + parent_selector + " .js_delete_all").on('click', function(e) {
							var data, href;
							href = $(this).data('action');
							if (confirm("Are you sure you want to delete all items in the archive? This action cannot be undone.")) {
								data = "ajax=1";
								resetInterface();
								$.post(href, data).success(function(response) {
									removeAllArticlesFromView();
									return window.location.href = window.location.href;
								}).error(function(response) {});
							}
							return false;
						});
					};
					$('.js_save_article').on('click', function(e) {
						var data, href;
						e.preventDefault();
						if ($(this).hasClass('saved')) {
							return false;
						}
						href = $(this).attr('href');
						data = "ajax=1";
						$(this).text('Savingâ€¦').addClass('saving');
						$.get(href, data, (function(_this) {
							return function(response) {
								$(_this).text('Saved').addClass('saved');
								$(_this).removeAttr('href');
								return $(_this).removeClass('saving');
							};
						})(this));
						return false;
					});
					$('.bookmarklet, .js_bookmarklet').not('.inactive_bookmarklet').mouseenter(function(e) {
						return $('#bookmarklet_explain').addClass('active');
					});
					$('body').on('mouseleave', '.bookmarklet, .js_bookmarklet', function(e) {
						if (e.which === 1) {
							return setTimeout(function() {
								return $('#bookmarklet_explain').removeClass('active');
							}, 4000);
						} else {
							return $('#bookmarklet_explain').removeClass('active');
						}
					});
					$('.bookmarklet, .js_bookmarklet').not('.inactive_bookmarklet').click(function(e) {
						return false;
					});
					$('#mobile_toggle').click(function() {
						if ($(this).hasClass('mobile_expanded')) {
							$(this).removeClass('mobile_expanded');
							$('#inner_column').removeClass('mobile_expanded');
							return $('#text_column').removeClass('mobile_inner');
						} else {
							$(this).addClass('mobile_expanded');
							$('#inner_column').addClass('mobile_expanded');
							return $('#text_column').addClass('mobile_inner');
						}
					});
					$('#searcher').focus(function(e) {
						return $('#search_available').addClass('active');
					});
					$('#searcher').blur(function(e) {
						var error;
						$('#search_available').removeClass('active');
						try {
							$(this).attr('value', '');
						} catch (_error) {
							error = _error;
						}
						return false;
					});
					$('.readAddress input').click(function() {
						return $(this).select();
					});
					$('.js_info_close').click(function() {
						return createCookie('weekly_banner', 'removed', 200);
					});
					$('.inactive_bookmarklet').click(function() {
						var $button, data, href;
						$button = $(this);
						href = $button.attr('href');
						data = "ajax=1";
						$button.text('â€¦').addClass('saving');
						$.get(href, data, function(response) {
							$button.text('âœ”').addClass('saved');
							$button.removeAttr('href');
							return $button.removeClass('saving');
						});
						return false;
					});
					$loader = $('#top_loader');
					$('.star_toggle').click(function() {
						var $article, data, href;
						href = $(this).attr('href');
						data = "ajax=1";
						$article = $(this).closest('.article_item');
						$(this).toggleClass('starred');
						$article.toggleClass('starred');
						resetInterface();
						gaLog('unread', 'like toggle');
						$.get(href, data).success(function(response) {}).error(function(response) {});
						return false;
					});
					$('.shareOut').click(function() {
						var h, l, link, t, w;
						link = $(this).attr('href');
						w = 450;
						h = 500;
						l = (screen.width / 2) - (w / 2);
						t = (screen.height / 2) - (h / 2);
						window.open(link, 'link out', 'width=' + w + ', height=' + h + ', left=' + l + ', top=' + t + $('.tableViewCell').removeClass('moving'));
						$('.menuContainer').removeClass('active');
						return false;
					});
					$('.evernoteShare').click(function() {
						var $menu;
						$menu = $(this).parents('.menu_container');
						$menu.find('.evernote_share_menu').addClass('active');
						return false;
					});
					$('.evernote_share_menu').click(function() {
						return false;
					});
					$('.evernote_share_menu .cancel_box').click(function() {
						$('.evernote_share_menu').removeClass('active');
						$('.menu_container').removeClass('active');
						return false;
					});
					$('.share_to_evernote_form input[type="submit"]').click(function() {
						var data;
						data = $(this).parents('.share_to_evernote_form').serialize();
						'';
						$('.evernote_share_menu').removeClass('active');
						$('.menu_container').removeClass('active');
						$.post('/user/share_to_evernote', data).success(function(response) {}).error(function(response) {});
						return false;
					});
					openModal = function(e) {
						var $autofocus, $autoselect, $target_modal, explicit_autofocus, focus_delay, target;
						resetInterface();
						focus_delay = isTouchDevice ? 1000 : 0;
						$('.modal').removeClass('active');
						$('#modal_backer').addClass('active');
						$('body').addClass('modal_active');
						target = $(this).attr('data-modal');
						$target_modal = $('#' + target);
						$target_modal.addClass('active');
						$('body').css('max-height', "" + window_height + "px");
						$autofocus = $target_modal.find('input[type="text"], input[type="email"], input[type="password"]').first();
						explicit_autofocus = $(this).attr('data-autofocus');
						if (explicit_autofocus !== void 0 && $(explicit_autofocus).length > 0) {
							$autofocus = $(explicit_autofocus);
						}
						$autoselect = $target_modal.find('[autoselect="autoselect"]');
						$target_modal.trigger("modal_shown");
						setTimeout((function() {
							if ($autoselect.length > 0) {
								return $autoselect.first().focus().select();
							} else {
								return $autofocus.focus();
							}
						}), focus_delay);
						return false;
					};
					dismissModal = function() {
						var $target_modal;
						$('body').css({
							'max-height': 'none'
						});
						$('#modal_backer').removeClass('active');
						$target_modal = $(".modal.active");
						$('.modal').removeClass('active');
						$('body').removeClass('modal_active');
						forceTouchOriginScrollPosition();
						$target_modal.trigger("modal_hidden");
						return false;
					};
					$('.open_modal').on('click', function(e) {
						return openModal.bind(this)(e);
					});
					$('#modal_backer').on('click', function(e) {
						return dismissModal();
					});
					$('.modal_close').on('click', function() {
						return dismissModal();
					});
					$('.js_bookmark_edit').on('click', function(e) {
						var article_id, selection, title, url;
						article_id = $(this).data('article-id');
						title = $(this).data('title');
						url = $(this).data('url');
						selection = $(this).data('selection');
						$('#bookmark_edit_form').attr('action', "/edit/" + article_id);
						$('#bookmark_edit_title').val(title);
						$('#bookmark_edit_url').val(url);
						$('#bookmark_edit_selection').text(selection);
						return false;
					});
					$('.js_reveal_submit_onchange input, .js_reveal_submit_onchange select, .js_reveal_submit_onchange textarea').on('change', function(e) {
						var $form;
						$form = $(this).closest('form');
						if ($form.attr('data-show')) {
							showHide.bind($form)(e);
							$form.removeAttr('data-show');
						} else {
							$form.find('button[type=submit]').removeClass('hidden');
						}
						return false;
					});
					$(document).keyup(function(e) {
						if (e.keyCode === 27 && $('body').hasClass('modal_active')) {
							dismissModal();
						}
						return false;
					});
					return initialize();
				});

			}).call(this);

		}).call(this, require("oMfpAn"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_68855bc9.js", "/")
	}, {
		"buffer": 2,
		"oMfpAn": 5
	}],
	2: [function(require, module, exports) {
		(function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
			/*!
			 * The buffer module from node.js, for the browser.
			 *
			 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
			 * @license  MIT
			 */

			var base64 = require('base64-js')
			var ieee754 = require('ieee754')

			exports.Buffer = Buffer
			exports.SlowBuffer = Buffer
			exports.INSPECT_MAX_BYTES = 50
			Buffer.poolSize = 8192

			/**
			 * If `Buffer._useTypedArrays`:
			 *   === true    Use Uint8Array implementation (fastest)
			 *   === false   Use Object implementation (compatible down to IE6)
			 */
			Buffer._useTypedArrays = (function() {
				// Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
				// Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
				// properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
				// because we need to be able to add all the node Buffer API methods. This is an issue
				// in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
				try {
					var buf = new ArrayBuffer(0)
					var arr = new Uint8Array(buf)
					arr.foo = function() {
						return 42
					}
					return 42 === arr.foo() &&
						typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
				} catch (e) {
					return false
				}
			})()

			/**
			 * Class: Buffer
			 * =============
			 *
			 * The Buffer constructor returns instances of `Uint8Array` that are augmented
			 * with function properties for all the node `Buffer` API functions. We use
			 * `Uint8Array` so that square bracket notation works as expected -- it returns
			 * a single octet.
			 *
			 * By augmenting the instances, we can avoid modifying the `Uint8Array`
			 * prototype.
			 */
			function Buffer(subject, encoding, noZero) {
				if (!(this instanceof Buffer))
					return new Buffer(subject, encoding, noZero)

				var type = typeof subject

				// Workaround: node's base64 implementation allows for non-padded strings
				// while base64-js does not.
				if (encoding === 'base64' && type === 'string') {
					subject = stringtrim(subject)
					while (subject.length % 4 !== 0) {
						subject = subject + '='
					}
				}

				// Find the length
				var length
				if (type === 'number')
					length = coerce(subject)
				else if (type === 'string')
					length = Buffer.byteLength(subject, encoding)
				else if (type === 'object')
					length = coerce(subject.length) // assume that object is array-like
				else
					throw new Error('First argument needs to be a number, array or string.')

				var buf
				if (Buffer._useTypedArrays) {
					// Preferred: Return an augmented `Uint8Array` instance for best performance
					buf = Buffer._augment(new Uint8Array(length))
				} else {
					// Fallback: Return THIS instance of Buffer (created by `new`)
					buf = this
					buf.length = length
					buf._isBuffer = true
				}

				var i
				if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
					// Speed optimization -- use set if we're copying from a typed array
					buf._set(subject)
				} else if (isArrayish(subject)) {
					// Treat array-ish objects as a byte array
					for (i = 0; i < length; i++) {
						if (Buffer.isBuffer(subject))
							buf[i] = subject.readUInt8(i)
						else
							buf[i] = subject[i]
					}
				} else if (type === 'string') {
					buf.write(subject, 0, encoding)
				} else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
					for (i = 0; i < length; i++) {
						buf[i] = 0
					}
				}

				return buf
			}

			// STATIC METHODS
			// ==============

			Buffer.isEncoding = function(encoding) {
				switch (String(encoding).toLowerCase()) {
					case 'hex':
					case 'utf8':
					case 'utf-8':
					case 'ascii':
					case 'binary':
					case 'base64':
					case 'raw':
					case 'ucs2':
					case 'ucs-2':
					case 'utf16le':
					case 'utf-16le':
						return true
					default:
						return false
				}
			}

			Buffer.isBuffer = function(b) {
				return !!(b !== null && b !== undefined && b._isBuffer)
			}

			Buffer.byteLength = function(str, encoding) {
				var ret
				str = str + ''
				switch (encoding || 'utf8') {
					case 'hex':
						ret = str.length / 2
						break
					case 'utf8':
					case 'utf-8':
						ret = utf8ToBytes(str).length
						break
					case 'ascii':
					case 'binary':
					case 'raw':
						ret = str.length
						break
					case 'base64':
						ret = base64ToBytes(str).length
						break
					case 'ucs2':
					case 'ucs-2':
					case 'utf16le':
					case 'utf-16le':
						ret = str.length * 2
						break
					default:
						throw new Error('Unknown encoding')
				}
				return ret
			}

			Buffer.concat = function(list, totalLength) {
				assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
					'list should be an Array.')

				if (list.length === 0) {
					return new Buffer(0)
				} else if (list.length === 1) {
					return list[0]
				}

				var i
				if (typeof totalLength !== 'number') {
					totalLength = 0
					for (i = 0; i < list.length; i++) {
						totalLength += list[i].length
					}
				}

				var buf = new Buffer(totalLength)
				var pos = 0
				for (i = 0; i < list.length; i++) {
					var item = list[i]
					item.copy(buf, pos)
					pos += item.length
				}
				return buf
			}

			// BUFFER INSTANCE METHODS
			// =======================

			function _hexWrite(buf, string, offset, length) {
				offset = Number(offset) || 0
				var remaining = buf.length - offset
				if (!length) {
					length = remaining
				} else {
					length = Number(length)
					if (length > remaining) {
						length = remaining
					}
				}

				// must be an even number of digits
				var strLen = string.length
				assert(strLen % 2 === 0, 'Invalid hex string')

				if (length > strLen / 2) {
					length = strLen / 2
				}
				for (var i = 0; i < length; i++) {
					var byte = parseInt(string.substr(i * 2, 2), 16)
					assert(!isNaN(byte), 'Invalid hex string')
					buf[offset + i] = byte
				}
				Buffer._charsWritten = i * 2
				return i
			}

			function _utf8Write(buf, string, offset, length) {
				var charsWritten = Buffer._charsWritten =
					blitBuffer(utf8ToBytes(string), buf, offset, length)
				return charsWritten
			}

			function _asciiWrite(buf, string, offset, length) {
				var charsWritten = Buffer._charsWritten =
					blitBuffer(asciiToBytes(string), buf, offset, length)
				return charsWritten
			}

			function _binaryWrite(buf, string, offset, length) {
				return _asciiWrite(buf, string, offset, length)
			}

			function _base64Write(buf, string, offset, length) {
				var charsWritten = Buffer._charsWritten =
					blitBuffer(base64ToBytes(string), buf, offset, length)
				return charsWritten
			}

			function _utf16leWrite(buf, string, offset, length) {
				var charsWritten = Buffer._charsWritten =
					blitBuffer(utf16leToBytes(string), buf, offset, length)
				return charsWritten
			}

			Buffer.prototype.write = function(string, offset, length, encoding) {
				// Support both (string, offset, length, encoding)
				// and the legacy (string, encoding, offset, length)
				if (isFinite(offset)) {
					if (!isFinite(length)) {
						encoding = length
						length = undefined
					}
				} else { // legacy
					var swap = encoding
					encoding = offset
					offset = length
					length = swap
				}

				offset = Number(offset) || 0
				var remaining = this.length - offset
				if (!length) {
					length = remaining
				} else {
					length = Number(length)
					if (length > remaining) {
						length = remaining
					}
				}
				encoding = String(encoding || 'utf8').toLowerCase()

				var ret
				switch (encoding) {
					case 'hex':
						ret = _hexWrite(this, string, offset, length)
						break
					case 'utf8':
					case 'utf-8':
						ret = _utf8Write(this, string, offset, length)
						break
					case 'ascii':
						ret = _asciiWrite(this, string, offset, length)
						break
					case 'binary':
						ret = _binaryWrite(this, string, offset, length)
						break
					case 'base64':
						ret = _base64Write(this, string, offset, length)
						break
					case 'ucs2':
					case 'ucs-2':
					case 'utf16le':
					case 'utf-16le':
						ret = _utf16leWrite(this, string, offset, length)
						break
					default:
						throw new Error('Unknown encoding')
				}
				return ret
			}

			Buffer.prototype.toString = function(encoding, start, end) {
				var self = this

				encoding = String(encoding || 'utf8').toLowerCase()
				start = Number(start) || 0
				end = (end !== undefined) ?
					Number(end) :
					end = self.length

				// Fastpath empty strings
				if (end === start)
					return ''

				var ret
				switch (encoding) {
					case 'hex':
						ret = _hexSlice(self, start, end)
						break
					case 'utf8':
					case 'utf-8':
						ret = _utf8Slice(self, start, end)
						break
					case 'ascii':
						ret = _asciiSlice(self, start, end)
						break
					case 'binary':
						ret = _binarySlice(self, start, end)
						break
					case 'base64':
						ret = _base64Slice(self, start, end)
						break
					case 'ucs2':
					case 'ucs-2':
					case 'utf16le':
					case 'utf-16le':
						ret = _utf16leSlice(self, start, end)
						break
					default:
						throw new Error('Unknown encoding')
				}
				return ret
			}

			Buffer.prototype.toJSON = function() {
				return {
					type: 'Buffer',
					data: Array.prototype.slice.call(this._arr || this, 0)
				}
			}

			// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
			Buffer.prototype.copy = function(target, target_start, start, end) {
				var source = this

				if (!start) start = 0
				if (!end && end !== 0) end = this.length
				if (!target_start) target_start = 0

				// Copy 0 bytes; we're done
				if (end === start) return
				if (target.length === 0 || source.length === 0) return

				// Fatal error conditions
				assert(end >= start, 'sourceEnd < sourceStart')
				assert(target_start >= 0 && target_start < target.length,
					'targetStart out of bounds')
				assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
				assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

				// Are we oob?
				if (end > this.length)
					end = this.length
				if (target.length - target_start < end - start)
					end = target.length - target_start + start

				var len = end - start

				if (len < 100 || !Buffer._useTypedArrays) {
					for (var i = 0; i < len; i++)
						target[i + target_start] = this[i + start]
				} else {
					target._set(this.subarray(start, start + len), target_start)
				}
			}

			function _base64Slice(buf, start, end) {
				if (start === 0 && end === buf.length) {
					return base64.fromByteArray(buf)
				} else {
					return base64.fromByteArray(buf.slice(start, end))
				}
			}

			function _utf8Slice(buf, start, end) {
				var res = ''
				var tmp = ''
				end = Math.min(buf.length, end)

				for (var i = start; i < end; i++) {
					if (buf[i] <= 0x7F) {
						res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
						tmp = ''
					} else {
						tmp += '%' + buf[i].toString(16)
					}
				}

				return res + decodeUtf8Char(tmp)
			}

			function _asciiSlice(buf, start, end) {
				var ret = ''
				end = Math.min(buf.length, end)

				for (var i = start; i < end; i++)
					ret += String.fromCharCode(buf[i])
				return ret
			}

			function _binarySlice(buf, start, end) {
				return _asciiSlice(buf, start, end)
			}

			function _hexSlice(buf, start, end) {
				var len = buf.length

				if (!start || start < 0) start = 0
				if (!end || end < 0 || end > len) end = len

				var out = ''
				for (var i = start; i < end; i++) {
					out += toHex(buf[i])
				}
				return out
			}

			function _utf16leSlice(buf, start, end) {
				var bytes = buf.slice(start, end)
				var res = ''
				for (var i = 0; i < bytes.length; i += 2) {
					res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
				}
				return res
			}

			Buffer.prototype.slice = function(start, end) {
				var len = this.length
				start = clamp(start, len, 0)
				end = clamp(end, len, len)

				if (Buffer._useTypedArrays) {
					return Buffer._augment(this.subarray(start, end))
				} else {
					var sliceLen = end - start
					var newBuf = new Buffer(sliceLen, undefined, true)
					for (var i = 0; i < sliceLen; i++) {
						newBuf[i] = this[i + start]
					}
					return newBuf
				}
			}

			// `get` will be removed in Node 0.13+
			Buffer.prototype.get = function(offset) {
				console.log('.get() is deprecated. Access using array indexes instead.')
				return this.readUInt8(offset)
			}

			// `set` will be removed in Node 0.13+
			Buffer.prototype.set = function(v, offset) {
				console.log('.set() is deprecated. Access using array indexes instead.')
				return this.writeUInt8(v, offset)
			}

			Buffer.prototype.readUInt8 = function(offset, noAssert) {
				if (!noAssert) {
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset < this.length, 'Trying to read beyond buffer length')
				}

				if (offset >= this.length)
					return

				return this[offset]
			}

			function _readUInt16(buf, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
				}

				var len = buf.length
				if (offset >= len)
					return

				var val
				if (littleEndian) {
					val = buf[offset]
					if (offset + 1 < len)
						val |= buf[offset + 1] << 8
				} else {
					val = buf[offset] << 8
					if (offset + 1 < len)
						val |= buf[offset + 1]
				}
				return val
			}

			Buffer.prototype.readUInt16LE = function(offset, noAssert) {
				return _readUInt16(this, offset, true, noAssert)
			}

			Buffer.prototype.readUInt16BE = function(offset, noAssert) {
				return _readUInt16(this, offset, false, noAssert)
			}

			function _readUInt32(buf, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
				}

				var len = buf.length
				if (offset >= len)
					return

				var val
				if (littleEndian) {
					if (offset + 2 < len)
						val = buf[offset + 2] << 16
					if (offset + 1 < len)
						val |= buf[offset + 1] << 8
					val |= buf[offset]
					if (offset + 3 < len)
						val = val + (buf[offset + 3] << 24 >>> 0)
				} else {
					if (offset + 1 < len)
						val = buf[offset + 1] << 16
					if (offset + 2 < len)
						val |= buf[offset + 2] << 8
					if (offset + 3 < len)
						val |= buf[offset + 3]
					val = val + (buf[offset] << 24 >>> 0)
				}
				return val
			}

			Buffer.prototype.readUInt32LE = function(offset, noAssert) {
				return _readUInt32(this, offset, true, noAssert)
			}

			Buffer.prototype.readUInt32BE = function(offset, noAssert) {
				return _readUInt32(this, offset, false, noAssert)
			}

			Buffer.prototype.readInt8 = function(offset, noAssert) {
				if (!noAssert) {
					assert(offset !== undefined && offset !== null,
						'missing offset')
					assert(offset < this.length, 'Trying to read beyond buffer length')
				}

				if (offset >= this.length)
					return

				var neg = this[offset] & 0x80
				if (neg)
					return (0xff - this[offset] + 1) * -1
				else
					return this[offset]
			}

			function _readInt16(buf, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
				}

				var len = buf.length
				if (offset >= len)
					return

				var val = _readUInt16(buf, offset, littleEndian, true)
				var neg = val & 0x8000
				if (neg)
					return (0xffff - val + 1) * -1
				else
					return val
			}

			Buffer.prototype.readInt16LE = function(offset, noAssert) {
				return _readInt16(this, offset, true, noAssert)
			}

			Buffer.prototype.readInt16BE = function(offset, noAssert) {
				return _readInt16(this, offset, false, noAssert)
			}

			function _readInt32(buf, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
				}

				var len = buf.length
				if (offset >= len)
					return

				var val = _readUInt32(buf, offset, littleEndian, true)
				var neg = val & 0x80000000
				if (neg)
					return (0xffffffff - val + 1) * -1
				else
					return val
			}

			Buffer.prototype.readInt32LE = function(offset, noAssert) {
				return _readInt32(this, offset, true, noAssert)
			}

			Buffer.prototype.readInt32BE = function(offset, noAssert) {
				return _readInt32(this, offset, false, noAssert)
			}

			function _readFloat(buf, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
				}

				return ieee754.read(buf, offset, littleEndian, 23, 4)
			}

			Buffer.prototype.readFloatLE = function(offset, noAssert) {
				return _readFloat(this, offset, true, noAssert)
			}

			Buffer.prototype.readFloatBE = function(offset, noAssert) {
				return _readFloat(this, offset, false, noAssert)
			}

			function _readDouble(buf, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
				}

				return ieee754.read(buf, offset, littleEndian, 52, 8)
			}

			Buffer.prototype.readDoubleLE = function(offset, noAssert) {
				return _readDouble(this, offset, true, noAssert)
			}

			Buffer.prototype.readDoubleBE = function(offset, noAssert) {
				return _readDouble(this, offset, false, noAssert)
			}

			Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset < this.length, 'trying to write beyond buffer length')
					verifuint(value, 0xff)
				}

				if (offset >= this.length) return

				this[offset] = value
			}

			function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
					verifuint(value, 0xffff)
				}

				var len = buf.length
				if (offset >= len)
					return

				for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
					buf[offset + i] =
						(value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
						(littleEndian ? i : 1 - i) * 8
				}
			}

			Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
				_writeUInt16(this, value, offset, true, noAssert)
			}

			Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
				_writeUInt16(this, value, offset, false, noAssert)
			}

			function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
					verifuint(value, 0xffffffff)
				}

				var len = buf.length
				if (offset >= len)
					return

				for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
					buf[offset + i] =
						(value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
				}
			}

			Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
				_writeUInt32(this, value, offset, true, noAssert)
			}

			Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
				_writeUInt32(this, value, offset, false, noAssert)
			}

			Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset < this.length, 'Trying to write beyond buffer length')
					verifsint(value, 0x7f, -0x80)
				}

				if (offset >= this.length)
					return

				if (value >= 0)
					this.writeUInt8(value, offset, noAssert)
				else
					this.writeUInt8(0xff + value + 1, offset, noAssert)
			}

			function _writeInt16(buf, value, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
					verifsint(value, 0x7fff, -0x8000)
				}

				var len = buf.length
				if (offset >= len)
					return

				if (value >= 0)
					_writeUInt16(buf, value, offset, littleEndian, noAssert)
				else
					_writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
			}

			Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
				_writeInt16(this, value, offset, true, noAssert)
			}

			Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
				_writeInt16(this, value, offset, false, noAssert)
			}

			function _writeInt32(buf, value, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
					verifsint(value, 0x7fffffff, -0x80000000)
				}

				var len = buf.length
				if (offset >= len)
					return

				if (value >= 0)
					_writeUInt32(buf, value, offset, littleEndian, noAssert)
				else
					_writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
			}

			Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
				_writeInt32(this, value, offset, true, noAssert)
			}

			Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
				_writeInt32(this, value, offset, false, noAssert)
			}

			function _writeFloat(buf, value, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
					verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
				}

				var len = buf.length
				if (offset >= len)
					return

				ieee754.write(buf, value, offset, littleEndian, 23, 4)
			}

			Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
				_writeFloat(this, value, offset, true, noAssert)
			}

			Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
				_writeFloat(this, value, offset, false, noAssert)
			}

			function _writeDouble(buf, value, offset, littleEndian, noAssert) {
				if (!noAssert) {
					assert(value !== undefined && value !== null, 'missing value')
					assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
					assert(offset !== undefined && offset !== null, 'missing offset')
					assert(offset + 7 < buf.length,
						'Trying to write beyond buffer length')
					verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
				}

				var len = buf.length
				if (offset >= len)
					return

				ieee754.write(buf, value, offset, littleEndian, 52, 8)
			}

			Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
				_writeDouble(this, value, offset, true, noAssert)
			}

			Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
				_writeDouble(this, value, offset, false, noAssert)
			}

			// fill(value, start=0, end=buffer.length)
			Buffer.prototype.fill = function(value, start, end) {
				if (!value) value = 0
				if (!start) start = 0
				if (!end) end = this.length

				if (typeof value === 'string') {
					value = value.charCodeAt(0)
				}

				assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
				assert(end >= start, 'end < start')

				// Fill 0 bytes; we're done
				if (end === start) return
				if (this.length === 0) return

				assert(start >= 0 && start < this.length, 'start out of bounds')
				assert(end >= 0 && end <= this.length, 'end out of bounds')

				for (var i = start; i < end; i++) {
					this[i] = value
				}
			}

			Buffer.prototype.inspect = function() {
				var out = []
				var len = this.length
				for (var i = 0; i < len; i++) {
					out[i] = toHex(this[i])
					if (i === exports.INSPECT_MAX_BYTES) {
						out[i + 1] = '...'
						break
					}
				}
				return '<Buffer ' + out.join(' ') + '>'
			}

			/**
			 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
			 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
			 */
			Buffer.prototype.toArrayBuffer = function() {
				if (typeof Uint8Array !== 'undefined') {
					if (Buffer._useTypedArrays) {
						return (new Buffer(this)).buffer
					} else {
						var buf = new Uint8Array(this.length)
						for (var i = 0, len = buf.length; i < len; i += 1)
							buf[i] = this[i]
						return buf.buffer
					}
				} else {
					throw new Error('Buffer.toArrayBuffer not supported in this browser')
				}
			}

			// HELPER FUNCTIONS
			// ================

			function stringtrim(str) {
				if (str.trim) return str.trim()
				return str.replace(/^\s+|\s+$/g, '')
			}

			var BP = Buffer.prototype

			/**
			 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
			 */
			Buffer._augment = function(arr) {
				arr._isBuffer = true

				// save reference to original Uint8Array get/set methods before overwriting
				arr._get = arr.get
				arr._set = arr.set

				// deprecated, will be removed in node 0.13+
				arr.get = BP.get
				arr.set = BP.set

				arr.write = BP.write
				arr.toString = BP.toString
				arr.toLocaleString = BP.toString
				arr.toJSON = BP.toJSON
				arr.copy = BP.copy
				arr.slice = BP.slice
				arr.readUInt8 = BP.readUInt8
				arr.readUInt16LE = BP.readUInt16LE
				arr.readUInt16BE = BP.readUInt16BE
				arr.readUInt32LE = BP.readUInt32LE
				arr.readUInt32BE = BP.readUInt32BE
				arr.readInt8 = BP.readInt8
				arr.readInt16LE = BP.readInt16LE
				arr.readInt16BE = BP.readInt16BE
				arr.readInt32LE = BP.readInt32LE
				arr.readInt32BE = BP.readInt32BE
				arr.readFloatLE = BP.readFloatLE
				arr.readFloatBE = BP.readFloatBE
				arr.readDoubleLE = BP.readDoubleLE
				arr.readDoubleBE = BP.readDoubleBE
				arr.writeUInt8 = BP.writeUInt8
				arr.writeUInt16LE = BP.writeUInt16LE
				arr.writeUInt16BE = BP.writeUInt16BE
				arr.writeUInt32LE = BP.writeUInt32LE
				arr.writeUInt32BE = BP.writeUInt32BE
				arr.writeInt8 = BP.writeInt8
				arr.writeInt16LE = BP.writeInt16LE
				arr.writeInt16BE = BP.writeInt16BE
				arr.writeInt32LE = BP.writeInt32LE
				arr.writeInt32BE = BP.writeInt32BE
				arr.writeFloatLE = BP.writeFloatLE
				arr.writeFloatBE = BP.writeFloatBE
				arr.writeDoubleLE = BP.writeDoubleLE
				arr.writeDoubleBE = BP.writeDoubleBE
				arr.fill = BP.fill
				arr.inspect = BP.inspect
				arr.toArrayBuffer = BP.toArrayBuffer

				return arr
			}

			// slice(start, end)
			function clamp(index, len, defaultValue) {
				if (typeof index !== 'number') return defaultValue
				index = ~~index; // Coerce to integer.
				if (index >= len) return len
				if (index >= 0) return index
				index += len
				if (index >= 0) return index
				return 0
			}

			function coerce(length) {
				// Coerce length to a number (possibly NaN), round up
				// in case it's fractional (e.g. 123.456) then do a
				// double negate to coerce a NaN to 0. Easy, right?
				length = ~~Math.ceil(+length)
				return length < 0 ? 0 : length
			}

			function isArray(subject) {
				return (Array.isArray || function(subject) {
					return Object.prototype.toString.call(subject) === '[object Array]'
				})(subject)
			}

			function isArrayish(subject) {
				return isArray(subject) || Buffer.isBuffer(subject) ||
					subject && typeof subject === 'object' &&
					typeof subject.length === 'number'
			}

			function toHex(n) {
				if (n < 16) return '0' + n.toString(16)
				return n.toString(16)
			}

			function utf8ToBytes(str) {
				var byteArray = []
				for (var i = 0; i < str.length; i++) {
					var b = str.charCodeAt(i)
					if (b <= 0x7F)
						byteArray.push(str.charCodeAt(i))
					else {
						var start = i
						if (b >= 0xD800 && b <= 0xDFFF) i++
							var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%')
						for (var j = 0; j < h.length; j++)
							byteArray.push(parseInt(h[j], 16))
					}
				}
				return byteArray
			}

			function asciiToBytes(str) {
				var byteArray = []
				for (var i = 0; i < str.length; i++) {
					// Node's code seems to be doing this and not & 0x7F..
					byteArray.push(str.charCodeAt(i) & 0xFF)
				}
				return byteArray
			}

			function utf16leToBytes(str) {
				var c, hi, lo
				var byteArray = []
				for (var i = 0; i < str.length; i++) {
					c = str.charCodeAt(i)
					hi = c >> 8
					lo = c % 256
					byteArray.push(lo)
					byteArray.push(hi)
				}

				return byteArray
			}

			function base64ToBytes(str) {
				return base64.toByteArray(str)
			}

			function blitBuffer(src, dst, offset, length) {
				var pos
				for (var i = 0; i < length; i++) {
					if ((i + offset >= dst.length) || (i >= src.length))
						break
					dst[i + offset] = src[i]
				}
				return i
			}

			function decodeUtf8Char(str) {
				try {
					return decodeURIComponent(str)
				} catch (err) {
					return String.fromCharCode(0xFFFD) // UTF 8 invalid char
				}
			}

			/*
			 * We have to make sure that the value is a valid integer. This means that it
			 * is non-negative. It has no fractional component and that it does not
			 * exceed the maximum allowed value.
			 */
			function verifuint(value, max) {
				assert(typeof value === 'number', 'cannot write a non-number as a number')
				assert(value >= 0, 'specified a negative value for writing an unsigned value')
				assert(value <= max, 'value is larger than maximum value for type')
				assert(Math.floor(value) === value, 'value has a fractional component')
			}

			function verifsint(value, max, min) {
				assert(typeof value === 'number', 'cannot write a non-number as a number')
				assert(value <= max, 'value larger than maximum allowed value')
				assert(value >= min, 'value smaller than minimum allowed value')
				assert(Math.floor(value) === value, 'value has a fractional component')
			}

			function verifIEEE754(value, max, min) {
				assert(typeof value === 'number', 'cannot write a non-number as a number')
				assert(value <= max, 'value larger than maximum allowed value')
				assert(value >= min, 'value smaller than minimum allowed value')
			}

			function assert(test, message) {
				if (!test) throw new Error(message || 'Failed assertion')
			}

		}).call(this, require("oMfpAn"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js", "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
	}, {
		"base64-js": 3,
		"buffer": 2,
		"ieee754": 4,
		"oMfpAn": 5
	}],
	3: [function(require, module, exports) {
		(function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
			var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

			;
			(function(exports) {
				'use strict';

				var Arr = (typeof Uint8Array !== 'undefined') ?
					Uint8Array :
					Array

				var PLUS = '+'.charCodeAt(0)
				var SLASH = '/'.charCodeAt(0)
				var NUMBER = '0'.charCodeAt(0)
				var LOWER = 'a'.charCodeAt(0)
				var UPPER = 'A'.charCodeAt(0)
				var PLUS_URL_SAFE = '-'.charCodeAt(0)
				var SLASH_URL_SAFE = '_'.charCodeAt(0)

				function decode(elt) {
					var code = elt.charCodeAt(0)
					if (code === PLUS ||
						code === PLUS_URL_SAFE)
						return 62 // '+'
					if (code === SLASH ||
						code === SLASH_URL_SAFE)
						return 63 // '/'
					if (code < NUMBER)
						return -1 //no match
					if (code < NUMBER + 10)
						return code - NUMBER + 26 + 26
					if (code < UPPER + 26)
						return code - UPPER
					if (code < LOWER + 26)
						return code - LOWER + 26
				}

				function b64ToByteArray(b64) {
					var i, j, l, tmp, placeHolders, arr

					if (b64.length % 4 > 0) {
						throw new Error('Invalid string. Length must be a multiple of 4')
					}

					// the number of equal signs (place holders)
					// if there are two placeholders, than the two characters before it
					// represent one byte
					// if there is only one, then the three characters before it represent 2 bytes
					// this is just a cheap hack to not do indexOf twice
					var len = b64.length
					placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

					// base64 is 4/3 + up to two characters of the original data
					arr = new Arr(b64.length * 3 / 4 - placeHolders)

					// if there are placeholders, only get up to the last complete 4 chars
					l = placeHolders > 0 ? b64.length - 4 : b64.length

					var L = 0

					function push(v) {
						arr[L++] = v
					}

					for (i = 0, j = 0; i < l; i += 4, j += 3) {
						tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
						push((tmp & 0xFF0000) >> 16)
						push((tmp & 0xFF00) >> 8)
						push(tmp & 0xFF)
					}

					if (placeHolders === 2) {
						tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
						push(tmp & 0xFF)
					} else if (placeHolders === 1) {
						tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
						push((tmp >> 8) & 0xFF)
						push(tmp & 0xFF)
					}

					return arr
				}

				function uint8ToBase64(uint8) {
					var i,
						extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
						output = "",
						temp, length

					function encode(num) {
						return lookup.charAt(num)
					}

					function tripletToBase64(num) {
						return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
					}

					// go through the array every three bytes, we'll deal with trailing stuff later
					for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
						temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
						output += tripletToBase64(temp)
					}

					// pad the end with zeros, but make sure to not forget the extra bytes
					switch (extraBytes) {
						case 1:
							temp = uint8[uint8.length - 1]
							output += encode(temp >> 2)
							output += encode((temp << 4) & 0x3F)
							output += '=='
							break
						case 2:
							temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
							output += encode(temp >> 10)
							output += encode((temp >> 4) & 0x3F)
							output += encode((temp << 2) & 0x3F)
							output += '='
							break
					}

					return output
				}

				exports.toByteArray = b64ToByteArray
				exports.fromByteArray = uint8ToBase64
			}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

		}).call(this, require("oMfpAn"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js", "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
	}, {
		"buffer": 2,
		"oMfpAn": 5
	}],
	4: [function(require, module, exports) {
		(function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
			exports.read = function(buffer, offset, isLE, mLen, nBytes) {
				var e, m
				var eLen = nBytes * 8 - mLen - 1
				var eMax = (1 << eLen) - 1
				var eBias = eMax >> 1
				var nBits = -7
				var i = isLE ? (nBytes - 1) : 0
				var d = isLE ? -1 : 1
				var s = buffer[offset + i]

				i += d

				e = s & ((1 << (-nBits)) - 1)
				s >>= (-nBits)
				nBits += eLen
				for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

				m = e & ((1 << (-nBits)) - 1)
				e >>= (-nBits)
				nBits += mLen
				for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

				if (e === 0) {
					e = 1 - eBias
				} else if (e === eMax) {
					return m ? NaN : ((s ? -1 : 1) * Infinity)
				} else {
					m = m + Math.pow(2, mLen)
					e = e - eBias
				}
				return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
			}

			exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
				var e, m, c
				var eLen = nBytes * 8 - mLen - 1
				var eMax = (1 << eLen) - 1
				var eBias = eMax >> 1
				var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
				var i = isLE ? 0 : (nBytes - 1)
				var d = isLE ? 1 : -1
				var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

				value = Math.abs(value)

				if (isNaN(value) || value === Infinity) {
					m = isNaN(value) ? 1 : 0
					e = eMax
				} else {
					e = Math.floor(Math.log(value) / Math.LN2)
					if (value * (c = Math.pow(2, -e)) < 1) {
						e--
						c *= 2
					}
					if (e + eBias >= 1) {
						value += rt / c
					} else {
						value += rt * Math.pow(2, 1 - eBias)
					}
					if (value * c >= 2) {
						e++
						c /= 2
					}

					if (e + eBias >= eMax) {
						m = 0
						e = eMax
					} else if (e + eBias >= 1) {
						m = (value * c - 1) * Math.pow(2, mLen)
						e = e + eBias
					} else {
						m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
						e = 0
					}
				}

				for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

				e = (e << mLen) | m
				eLen += mLen
				for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

				buffer[offset + i - d] |= s * 128
			}

		}).call(this, require("oMfpAn"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js", "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
	}, {
		"buffer": 2,
		"oMfpAn": 5
	}],
	5: [function(require, module, exports) {
		(function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
			// shim for using process in browser

			var process = module.exports = {};

			process.nextTick = (function() {
				var canSetImmediate = typeof window !== 'undefined' &&
					window.setImmediate;
				var canPost = typeof window !== 'undefined' &&
					window.postMessage && window.addEventListener;

				if (canSetImmediate) {
					return function(f) {
						return window.setImmediate(f)
					};
				}

				if (canPost) {
					var queue = [];
					window.addEventListener('message', function(ev) {
						var source = ev.source;
						if ((source === window || source === null) && ev.data === 'process-tick') {
							ev.stopPropagation();
							if (queue.length > 0) {
								var fn = queue.shift();
								fn();
							}
						}
					}, true);

					return function nextTick(fn) {
						queue.push(fn);
						window.postMessage('process-tick', '*');
					};
				}

				return function nextTick(fn) {
					setTimeout(fn, 0);
				};
			})();

			process.title = 'browser';
			process.browser = true;
			process.env = {};
			process.argv = [];

			function noop() {}

			process.on = noop;
			process.addListener = noop;
			process.once = noop;
			process.off = noop;
			process.removeListener = noop;
			process.removeAllListeners = noop;
			process.emit = noop;

			process.binding = function(name) {
				throw new Error('process.binding is not supported');
			}

			// TODO(shtylman)
			process.cwd = function() {
				return '/'
			};
			process.chdir = function(dir) {
				throw new Error('process.chdir is not supported');
			};

		}).call(this, require("oMfpAn"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js", "/../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
	}, {
		"buffer": 2,
		"oMfpAn": 5
	}]
}, {}, [1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2luc3RhcGFwZXIvaW5zdGFwYXBlci1weXRob24vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvaW5zdGFwYXBlci9pbnN0YXBhcGVyLXB5dGhvbi8udG1wL2J1aWxkLWNvZmZlZS9mYWtlXzY4ODU1YmM5LmpzIiwiL2hvbWUvaW5zdGFwYXBlci9pbnN0YXBhcGVyLXB5dGhvbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCIvaG9tZS9pbnN0YXBhcGVyL2luc3RhcGFwZXItcHl0aG9uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCIvaG9tZS9pbnN0YXBhcGVyL2luc3RhcGFwZXItcHl0aG9uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIi9ob21lL2luc3RhcGFwZXIvaW5zdGFwYXBlci1weXRob24vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3eENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBfX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX19pbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgdmFyICRsb2FkZXIsIGFkZEZvbGRlciwgYW5kcm9pZCwgYXJ0aWNsZUl0ZW1TZWxlY3RIYW5kbGVyLCBhcnRpY2xlX211bHRpc2VsZWN0X2VuYWJsZWQsIGFydGljbGVfc2VsZWN0X2hhbmRsZXJzX3RpbWVvdXQsIGF0dGFjaEZvbGRlckRyYWdEcm9wRXZlbnRzLCBhdHRhY2hTZXR0aW5nc0hhbmRsZXJzLCBiYXRjaE1vZGlmeUFydGljbGVzLCBjaHJvbWUsIGNyZWF0ZUNvb2tpZSwgZGVzZWxlY3RBbGxBcnRpY2xlcywgZGVzdHJveVRvdWNoU2Nyb2xsZXJzLCBkaXNtaXNzTW9kYWwsIGRyYWdfZGF0YSwgZXNjYXBlU3RyaW5nLCBmaXJlQmF0Y2hPcGVyYXRpb24sIGZpcmVmb3gsIGZvb3Rlcl9oZWlnaHQsIGZvcmNlVG91Y2hPcmlnaW5TY3JvbGxQb3NpdGlvbiwgZnVsbHNjcmVlbiwgZ2FMb2csIGluaXRUb3VjaFNjcm9sbGVycywgaW5pdGlhbGl6ZSwgaW9zLCBpcGFkLCBpcGhvbmUsIGlzRGVza3RvcE9TLCBpc0RyYWdBbmREcm9wQ2FwYWJsZSwgaXNPbmVDb2x1bW4sIGlzUG9wb3ZlckFjdGl2ZSwgaXNUb3VjaERldmljZSwgaXNUb3VjaE9TLCBtYXJrRm9sZGVyRHJvcFBvc2l0aW9uLCBtb3ZlRm9sZGVyUG9zaXRpb24sIG9uVmlld3BvcnRSZXNpemUsIG9wZW5Nb2RhbCwgcGFnZV9oZWFkZXJfaGVpZ2h0LCBwb3BvdmVyX2JvZHlzdGF0ZSwgcmVmcmVzaFRvdWNoU2Nyb2xsZXJzLCByZW1vdmVBbGxBcnRpY2xlc0Zyb21WaWV3LCByZW1vdmVBcnRpY2xlRnJvbVZpZXcsIHJlbW92ZV9hcnRpY2xlX2FuaW1hdGlvbl9kdXJhdGlvbiwgcmVzZXRGb2xkZXJBZGQsIHJlc2V0SW50ZXJmYWNlLCBzYWZhcmksIHNlbGVjdEFsbEFydGljbGVzLCBzZWxlY3RlZF9hcnRpY2xlcywgc2hvdWxkRW5hYmxlRHJhZ0FuZERyb3AsIHNob3dIaWRlLCBzaWRlX25hdl9oZWlnaHQsIHRvZ2dsZUFydGljbGVTZWxlY3QsIHRvdWNoX3Njcm9sbGVyX21haW4sIHRvdWNoX3Njcm9sbGVyX3NpZGUsIHVhLCB1cGRhdGVBcnRpY2xlSXRlbVNlbGVjdEhhbmRsZXJzLCB1cGRhdGVBcnRpY2xlUG9wb3ZlclBsYWNlbWVudCwgdXBkYXRlRW1wdHlOb3RpY2UsIHVwZGF0ZVBhZ2VIZWFkZXJNb2RlLCB1cGRhdGVTY3JvbGxhYmxlTWF4SGVpZ2h0LCB1c2VUcmFuc2Zvcm1TY3JvbGwsIHdlYmtpdCwgd2luZG93X2hlaWdodCwgd2luZG93X3dpZHRoO1xuICAgIGNyZWF0ZUNvb2tpZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgICB2YXIgY29va2llLCBkYXRlLCBleHBpcmVzO1xuICAgICAgaWYgKGRheXMpIHtcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xuICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleHBpcmVzID0gXCJcIjtcbiAgICAgIH1cbiAgICAgIGNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIGVzY2FwZSh2YWx1ZSkgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcbiAgICB9O1xuICAgIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBpcGhvbmUgPSB+dWEuaW5kZXhPZignaVBob25lJykgfHwgfnVhLmluZGV4T2YoJ2lQb2QnKTtcbiAgICBpcGFkID0gfnVhLmluZGV4T2YoJ2lQYWQnKTtcbiAgICBpb3MgPSBpcGhvbmUgfHwgaXBhZDtcbiAgICBjaHJvbWUgPSB+dWEuaW5kZXhPZignQ2hyb21lJyk7XG4gICAgZmlyZWZveCA9IH51YS5pbmRleE9mKCdGaXJlZm94Jyk7XG4gICAgc2FmYXJpID0gfnVhLmluZGV4T2YoXCJTYWZhcmlcIik7XG4gICAgaWYgKGNocm9tZSAmJiBzYWZhcmkpIHtcbiAgICAgIHNhZmFyaSA9IGZhbHNlO1xuICAgIH1cbiAgICBmdWxsc2NyZWVuID0gd2luZG93Lm5hdmlnYXRvci5zdGFuZGFsb25lO1xuICAgIGFuZHJvaWQgPSB+dWEuaW5kZXhPZignQW5kcm9pZCcpO1xuICAgIHdlYmtpdCA9IH51YS5pbmRleE9mKCdXZWJLaXQnKTtcbiAgICB0b3VjaF9zY3JvbGxlcl9tYWluID0gbnVsbDtcbiAgICB0b3VjaF9zY3JvbGxlcl9zaWRlID0gbnVsbDtcbiAgICB3aW5kb3cud2Via2l0ID0gd2Via2l0O1xuICAgIHdpbmRvd193aWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgIHdpbmRvd19oZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgc2lkZV9uYXZfaGVpZ2h0ID0gJCgnI3NpZGVfbmF2Jykub3V0ZXJIZWlnaHQoKTtcbiAgICBwYWdlX2hlYWRlcl9oZWlnaHQgPSAkKCcucGFnZV9oZWFkZXInKS5vdXRlckhlaWdodCgpO1xuICAgIGZvb3Rlcl9oZWlnaHQgPSAkKCcjZm9vdGVyJykub3V0ZXJIZWlnaHQoKTtcbiAgICBwb3BvdmVyX2JvZHlzdGF0ZSA9IG51bGw7XG4gICAgYXJ0aWNsZV9tdWx0aXNlbGVjdF9lbmFibGVkID0gZmFsc2U7XG4gICAgc2VsZWN0ZWRfYXJ0aWNsZXMgPSBbXTtcbiAgICBhcnRpY2xlX3NlbGVjdF9oYW5kbGVyc190aW1lb3V0ID0gbnVsbDtcbiAgICBpc0RyYWdBbmREcm9wQ2FwYWJsZSA9ICQoJ2h0bWwnKS5oYXNDbGFzcygnZHJhZ2FuZGRyb3AnKTtcbiAgICBpc1RvdWNoRGV2aWNlID0gJCgnaHRtbCcpLmhhc0NsYXNzKCd0b3VjaCcpO1xuICAgIGlzVG91Y2hPUyA9IGlvcyB8fCBhbmRyb2lkO1xuICAgIGlzRGVza3RvcE9TID0gIWlzVG91Y2hPUztcbiAgICByZW1vdmVfYXJ0aWNsZV9hbmltYXRpb25fZHVyYXRpb24gPSA2MDA7XG4gICAgaXNPbmVDb2x1bW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKSA8IDc1MjtcbiAgICB9O1xuICAgIHVzZVRyYW5zZm9ybVNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGlzVG91Y2hPUyB8fCBpc09uZUNvbHVtbigpO1xuICAgIH07XG4gICAgc2hvdWxkRW5hYmxlRHJhZ0FuZERyb3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpc0RyYWdBbmREcm9wQ2FwYWJsZSAmJiAhKGlzVG91Y2hPUyB8fCBpc1RvdWNoRGV2aWNlKTtcbiAgICB9O1xuICAgIGlmIChpb3MpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfVxuICAgIGlmIChhbmRyb2lkKSB7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2FuZHJvaWQnKTtcbiAgICB9XG4gICAgaWYgKGlzRGVza3RvcE9TKSB7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2Rlc2t0b3Bfb3MnKTtcbiAgICB9XG4gICAgaWYgKGlwYWQpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXBhZF9tb2RlJyk7XG4gICAgfVxuICAgIGlmIChjaHJvbWUpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnY2hyb21lX21vZGUnKTtcbiAgICB9XG4gICAgaWYgKHNhZmFyaSkge1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdzYWZhcmlfbW9kZScpO1xuICAgIH1cbiAgICBpZiAoZmlyZWZveCkge1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdmaXJlZm94X21vZGUnKTtcbiAgICB9XG4gICAgaWYgKHVzZVRyYW5zZm9ybVNjcm9sbCgpKSB7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3RyYW5zZm9ybV9zY3JvbGxfbW9kZScpO1xuICAgIH1cbiAgICBpbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICBvblZpZXdwb3J0UmVzaXplKCk7XG4gICAgICAkKHdpbmRvdykucmVzaXplKG9uVmlld3BvcnRSZXNpemUpO1xuICAgICAgYXR0YWNoRm9sZGVyRHJhZ0Ryb3BFdmVudHMoJy5qc19mb2xkZXJfaXRlbScpO1xuICAgICAgaWYgKCF1c2VUcmFuc2Zvcm1TY3JvbGwoKSkge1xuICAgICAgICAkKCcuanNfdG9vbHRpcCcpLnRvb2x0aXAoe1xuICAgICAgICAgIHRyaWdnZXI6ICdob3ZlcidcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qc190b29sdGlwX2RlY29yYXRpdmUnKS50b29sdGlwKHtcbiAgICAgICAgICB0cmlnZ2VyOiAnbWFudWFsJ1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzX3Rvb2x0aXBfZGVjb3JhdGl2ZScpLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3ByZWxvYWQnKTtcbiAgICB9O1xuICAgIG9uVmlld3BvcnRSZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvd193aWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgd2luZG93X2hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgIHJlc2V0SW50ZXJmYWNlKCk7XG4gICAgICBpbml0VG91Y2hTY3JvbGxlcnMoKTtcbiAgICAgIHVwZGF0ZVNjcm9sbGFibGVNYXhIZWlnaHQoKTtcbiAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmVmcmVzaFRvdWNoU2Nyb2xsZXJzKCk7XG4gICAgICB9KSwgMzAwKTtcbiAgICAgIGlmIChpc09uZUNvbHVtbigpKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9iaWxlX21vZGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9iaWxlX21vZGUnKTtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2JpbGVfbWVudScpO1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vYmlsZV9lZGl0X21vZGUnKTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VUcmFuc2Zvcm1TY3JvbGwoKSkge1xuICAgICAgICBpbml0VG91Y2hTY3JvbGxlcnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc3Ryb3lUb3VjaFNjcm9sbGVycygpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICAgZm9yY2VUb3VjaE9yaWdpblNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgICBpZiAoYXJ0aWNsZV9zZWxlY3RfaGFuZGxlcnNfdGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoYXJ0aWNsZV9zZWxlY3RfaGFuZGxlcnNfdGltZW91dCk7XG4gICAgICAgIGFydGljbGVfc2VsZWN0X2hhbmRsZXJzX3RpbWVvdXQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFydGljbGVfc2VsZWN0X2hhbmRsZXJzX3RpbWVvdXQgPSBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlQXJ0aWNsZUl0ZW1TZWxlY3RIYW5kbGVycygpO1xuICAgICAgICBjbGVhclRpbWVvdXQoYXJ0aWNsZV9zZWxlY3RfaGFuZGxlcnNfdGltZW91dCk7XG4gICAgICAgIHJldHVybiBhcnRpY2xlX3NlbGVjdF9oYW5kbGVyc190aW1lb3V0ID0gbnVsbDtcbiAgICAgIH0pLCAxMDAwKTtcbiAgICB9O1xuICAgIGdhTG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYmlucztcbiAgICAgIGJpbnMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgaWYgKCFiaW5zIHx8IGJpbnMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYmlucy51bnNoaWZ0KCdldmVudCcpO1xuICAgICAgYmlucy51bnNoaWZ0KCdzZW5kJyk7XG4gICAgICB3aW5kb3cuZ2EuYXBwbHkobnVsbCwgYmlucyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIGluaXRUb3VjaFNjcm9sbGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHVzZVRyYW5zZm9ybVNjcm9sbCgpICYmIHRvdWNoX3Njcm9sbGVyX21haW4gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKCQoJyNtYWluX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0b3VjaF9zY3JvbGxlcl9tYWluID0gbmV3IElTY3JvbGwoJyNtYWluX2NvbnRhaW5lcicsIHtcbiAgICAgICAgICAgIG1vdXNlV2hlZWw6IHRydWUsXG4gICAgICAgICAgICBzaHJpbmtTY3JvbGxiYXJzOiAnc2NhbGUnLFxuICAgICAgICAgICAgY2xpY2s6IHRydWUsXG4gICAgICAgICAgICB0YXA6IGZhbHNlLFxuICAgICAgICAgICAgZmFkZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICBpbmRpY2F0b3JzOiB7XG4gICAgICAgICAgICAgIGVsOiAnI3Njcm9sbF9pbmRpY2F0b3Jfd3JhcHBlcicsXG4gICAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICAgIGlnbm9yZUJvdW5kYXJpZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGxpc3Rlblg6IGZhbHNlLFxuICAgICAgICAgICAgICBsaXN0ZW5ZOiB0cnVlLFxuICAgICAgICAgICAgICBjdXN0b21TdHlsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgcmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgICBzaHJpbms6IGZhbHNlLFxuICAgICAgICAgICAgICBzcGVlZFJhdGlvWDogMCxcbiAgICAgICAgICAgICAgc3BlZWRSYXRpb1k6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJCgnI3NpZGVfbmF2JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRvdWNoX3Njcm9sbGVyX3NpZGUgPSBuZXcgSVNjcm9sbCgnI3NpZGVfbmF2Jywge1xuICAgICAgICAgICAgbW91c2VXaGVlbDogdHJ1ZSxcbiAgICAgICAgICAgIHNocmlua1Njcm9sbGJhcnM6ICdzY2FsZScsXG4gICAgICAgICAgICB0YXA6IGZhbHNlLFxuICAgICAgICAgICAgY2xpY2s6IHRydWUsXG4gICAgICAgICAgICBmYWRlU2Nyb2xsYmFyczogdHJ1ZSxcbiAgICAgICAgICAgIGluZGljYXRvcnM6IHtcbiAgICAgICAgICAgICAgZWw6ICcjc2Nyb2xsX2luZGljYXRvcl9zaWRlX3dyYXBwZXInLFxuICAgICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgICBpZ25vcmVCb3VuZGFyaWVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICBsaXN0ZW5YOiBmYWxzZSxcbiAgICAgICAgICAgICAgbGlzdGVuWTogdHJ1ZSxcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHRydWUsXG4gICAgICAgICAgICAgIHJlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgc2hyaW5rOiBmYWxzZSxcbiAgICAgICAgICAgICAgc3BlZWRSYXRpb1g6IDAsXG4gICAgICAgICAgICAgIHNwZWVkUmF0aW9ZOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvdWNoX3Njcm9sbGVyX21haW4gfHwgdG91Y2hfc2Nyb2xsZXJfc2lkZSkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9KSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBkZXN0cm95VG91Y2hTY3JvbGxlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0b3VjaF9zY3JvbGxlcl9tYWluICE9PSBudWxsKSB7XG4gICAgICAgIHRvdWNoX3Njcm9sbGVyX21haW4uZGVzdHJveSgpO1xuICAgICAgICB0b3VjaF9zY3JvbGxlcl9tYWluID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0b3VjaF9zY3JvbGxlcl9zaWRlICE9PSBudWxsKSB7XG4gICAgICAgIHRvdWNoX3Njcm9sbGVyX3NpZGUuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gdG91Y2hfc2Nyb2xsZXJfc2lkZSA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgICByZWZyZXNoVG91Y2hTY3JvbGxlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRvdWNoX3Njcm9sbGVyX21haW4gIT09IG51bGwpIHtcbiAgICAgICAgICB0b3VjaF9zY3JvbGxlcl9tYWluLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG91Y2hfc2Nyb2xsZXJfc2lkZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0b3VjaF9zY3JvbGxlcl9zaWRlLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgfSksIDIwMCk7XG4gICAgfTtcbiAgICB1cGRhdGVTY3JvbGxhYmxlTWF4SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbWF4X2hlaWdodDtcbiAgICAgIGlmICgkKCcjc2lkZV9uYXYnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChpc09uZUNvbHVtbigpKSB7XG4gICAgICAgICAgbWF4X2hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAkKCcjc2lkZV9uYXYnKS5jc3MoJ2hlaWdodCcsIFwiXCIgKyBtYXhfaGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh1c2VUcmFuc2Zvcm1TY3JvbGwoKSkge1xuICAgICAgICAgIG1heF9oZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCkgLSAxNDA7XG4gICAgICAgICAgJCgnI3NpZGVfbmF2JykuY3NzKCdoZWlnaHQnLCBcIlwiICsgbWF4X2hlaWdodCArIFwicHhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF4X2hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSAtIDExMDtcbiAgICAgICAgICAkKCcjc2lkZV9uYXYnKS5jc3MoJ2hlaWdodCcsIFwiXCIgKyBtYXhfaGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCQoJyNtYWluX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHVzZVRyYW5zZm9ybVNjcm9sbCgpKSB7XG4gICAgICAgICAgbWF4X2hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAkKCcjbWFpbl9jb250YWluZXInKS5jc3MoJ2hlaWdodCcsIFwiXCIgKyBtYXhfaGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09uZUNvbHVtbigpKSB7XG4gICAgICAgICAgJCgnI21haW5fY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBcImF1dG9cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnI21haW5fY29udGFpbmVyJykuY3NzKCdoZWlnaHQnLCBcImF1dG9cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZWZyZXNoVG91Y2hTY3JvbGxlcnMoKTtcbiAgICB9O1xuICAgIGlzUG9wb3ZlckFjdGl2ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgbmFtZSA9ICdfcG9wb3Zlcic7XG4gICAgICB9XG4gICAgICByZXR1cm4gJCgnYm9keScpLmF0dHIoJ2NsYXNzJykuaW5kZXhPZihuYW1lKSAhPT0gLTE7XG4gICAgfTtcbiAgICByZXNldEludGVyZmFjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKHBvcG92ZXJfYm9keXN0YXRlKTtcbiAgICAgICQoJy5qc19wb3BvdmVyJykucG9wb3ZlcignaGlkZScpO1xuICAgICAgJCgnLmFydGljbGVfaXRlbScpLnJlbW92ZUNsYXNzKCdwb3BvdmVyX2FjdGl2ZScpO1xuICAgICAgJCgnI2ZvbGRlcl9pbmxpbmVfYWRkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgcmV0dXJuIHBvcG92ZXJfYm9keXN0YXRlID0gbnVsbDtcbiAgICB9O1xuICAgIHdpbmRvdy5yZXNldEludGVyZmFjZSA9IHJlc2V0SW50ZXJmYWNlO1xuICAgIGZvcmNlVG91Y2hPcmlnaW5TY3JvbGxQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH0pLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHVwZGF0ZUFydGljbGVJdGVtU2VsZWN0SGFuZGxlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpc09uZUNvbHVtbigpICYmICEkKCdib2R5JykuaGFzQ2xhc3MoJ21vYmlsZV9lZGl0X21vZGUnKSkge1xuICAgICAgICBpZiAoYXJ0aWNsZV9tdWx0aXNlbGVjdF9lbmFibGVkKSB7XG4gICAgICAgICAgYXJ0aWNsZV9tdWx0aXNlbGVjdF9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgJCgnLmpzX2FydGljbGVfaXRlbScpLm9mZignY2xpY2snLCBhcnRpY2xlSXRlbVNlbGVjdEhhbmRsZXIpO1xuICAgICAgICAgIHJldHVybiAkKCcuanNfYXJ0aWNsZV9pdGVtJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZUFydGljbGVTZWxlY3QuYmluZCh0aGlzKSh2b2lkIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFhcnRpY2xlX211bHRpc2VsZWN0X2VuYWJsZWQpIHtcbiAgICAgICAgICBhcnRpY2xlX211bHRpc2VsZWN0X2VuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICQoJy5qc19hcnRpY2xlX2l0ZW0nKS5vZmYoJ2NsaWNrJywgYXJ0aWNsZUl0ZW1TZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgICByZXR1cm4gJCgnLmpzX2FydGljbGVfaXRlbScpLm9uKCdjbGljaycsIGFydGljbGVJdGVtU2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGFydGljbGVJdGVtU2VsZWN0SGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChpc1BvcG92ZXJBY3RpdmUoKSkge1xuICAgICAgICByZXNldEludGVyZmFjZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXNldEludGVyZmFjZSgpO1xuICAgICAgcmV0dXJuIHRvZ2dsZUFydGljbGVTZWxlY3QuYmluZCh0aGlzKSgpO1xuICAgIH07XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgICQoJy5ldmVybm90ZV9zaGFyZV9tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgJCgnLmZvbGxvd190b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgZGF0YTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRhdGEgPSAkKHRoaXMpLnBhcmVudCgpLnNlcmlhbGl6ZSgpO1xuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3VuZm9sbG93X2J1dHRvbicpKSB7XG4gICAgICAgIGRhdGEgKz0gJyZ1bmZvbGxvdz10cnVlJztcbiAgICAgIH1cbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2ZvbGxvd19idXR0b24nKTtcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3VuZm9sbG93X2J1dHRvbicpO1xuICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICByZXR1cm4gJC5wb3N0KCcvdXNlci9mcmllbmRzJywgZGF0YSk7XG4gICAgfSk7XG4gICAgJCgnLmpzX2dhbG9nJykub24oJ2NsaWNrIHN1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBiLCBiaW5zO1xuICAgICAgYmlucyA9ICQodGhpcykuYXR0cignZGF0YS1iaW5zJyk7XG4gICAgICBiaW5zID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2ksIF9sZW4sIF9yZWYsIF9yZXN1bHRzO1xuICAgICAgICBfcmVmID0gYmlucy5zcGxpdCgnLCcpO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICBiID0gX3JlZltfaV07XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChiLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKTtcbiAgICAgIHJldHVybiBnYUxvZy5hcHBseShudWxsLCBiaW5zKTtcbiAgICB9KTtcbiAgICBpZiAoIWlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICQoJyNzaWRlX25hdicpLmhvdmVyKChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMpLmNzcygnb3ZlcmZsb3cteScsICdhdXRvJyk7XG4gICAgICB9KSwgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gJCh0aGlzKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgJCgnLmpzX3RvX3RvcCcpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICh0b3VjaF9zY3JvbGxlcl9tYWluICE9PSBudWxsKSB7XG4gICAgICAgIHRvdWNoX3Njcm9sbGVyX21haW4uc2Nyb2xsVG8oMCwgMCwgODAwLCBJU2Nyb2xsLnV0aWxzLmVhc2UuY2lyY3VsYXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5qc19tb2JpbGVfZWRpdF9lbmdhZ2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21vYmlsZV9lZGl0X21vZGUnKTtcbiAgICAgIHVwZGF0ZUFydGljbGVJdGVtU2VsZWN0SGFuZGxlcnMoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcubW9iaWxlX21lbnVfYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtb2JpbGVfbWVudScpO1xuICAgIH0pO1xuICAgICQoJyNtb2JpbGVfY292ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vYmlsZV9tZW51Jyk7XG4gICAgfSk7XG4gICAgJCgnLmpzX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIG9wdGlvbnMsIHByb3BzLCB0YXJnZXQ7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGFyZ2V0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWRpc21pc3MtdGFyZ2V0Jyk7XG4gICAgICBwcm9wcyA9IHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfTtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGNvbXBsZXRlOiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJChfdGhpcykuY2xvc2VzdCh0YXJnZXQpLnJlbW92ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpXG4gICAgICB9O1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KHRhcmdldCkuYW5pbWF0ZShwcm9wcywgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnLmpzX3BvcG92ZXInKS5wb3BvdmVyKHtcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICBodG1sOiB0cnVlLFxuICAgICAgdHJpZ2dlcjogJ21hbnVhbCcsXG4gICAgICBwbGFjZW1lbnQ6IChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCgkKHRoaXMpWzBdLiRlbGVtZW50Lm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKSkgPCAod2luZG93X2hlaWdodCAvIDIpKSB7XG4gICAgICAgICAgcmV0dXJuICdib3R0b20nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAndG9wJztcbiAgICAgIH0pLFxuICAgICAgY29udGVudDogKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGFyZ2V0O1xuICAgICAgICB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdGFyZ2V0Jyk7XG4gICAgICAgIHJldHVybiAkKHRhcmdldCkuaHRtbCgpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICAkKCcuanNfcG9wb3ZlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBuZXdfcG9wb3Zlcl9ib2R5c3RhdGU7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgbmV3X3BvcG92ZXJfYm9keXN0YXRlID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJvZHlzdGF0ZScpO1xuICAgICAgaWYgKG5ld19wb3BvdmVyX2JvZHlzdGF0ZSA9PT0gcG9wb3Zlcl9ib2R5c3RhdGUpIHtcbiAgICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmFydGljbGVfaXRlbScpLmFkZENsYXNzKCdwb3BvdmVyX2FjdGl2ZScpO1xuICAgICAgcG9wb3Zlcl9ib2R5c3RhdGUgPSBuZXdfcG9wb3Zlcl9ib2R5c3RhdGU7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MocG9wb3Zlcl9ib2R5c3RhdGUpO1xuICAgICAgJCh0aGlzKS5wb3BvdmVyKCdzaG93Jyk7XG4gICAgICAkKCcucG9wb3ZlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBzaG93SGlkZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBhbmltYXRlLCBoaWRlLCBoaWRlX2NsYXNzLCBvcHRpb25zLCBwcm9wcywgc2hvdywgc2hvd19hbmltYXRpb24sIHNob3dfY2xhc3M7XG4gICAgICBpZiAoJChlLnRhcmdldCkuaXMoXCJhXCIpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHNob3cgPSAkKHRoaXMpLmRhdGEoJ3Nob3cnKTtcbiAgICAgIGhpZGUgPSAkKHRoaXMpLmRhdGEoJ2hpZGUnKTtcbiAgICAgIGFuaW1hdGUgPSAkKHRoaXMpLmRhdGEoJ2FuaW1hdGUnKTtcbiAgICAgIHNob3dfY2xhc3MgPSAkKHRoaXMpLmRhdGEoJ3Nob3ctY2xhc3MnKSA/ICQodGhpcykuZGF0YSgnc2hvdy1jbGFzcycpIDogJ3Nob3cnO1xuICAgICAgaGlkZV9jbGFzcyA9ICQodGhpcykuZGF0YSgnaGlkZS1jbGFzcycpID8gJCh0aGlzKS5kYXRhKCdoaWRlLWNsYXNzJykgOiAnaGlkZGVuJztcbiAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgIGlmIChzaG93ICYmICQoc2hvdykuaGFzQ2xhc3MoaGlkZV9jbGFzcykpIHtcbiAgICAgICAgICAkKHNob3cpLmNzcygnb3BhY2l0eScsICcwJyk7XG4gICAgICAgICAgJChzaG93KS5yZW1vdmVDbGFzcyhoaWRlX2NsYXNzKS5hZGRDbGFzcyhzaG93X2NsYXNzKTtcbiAgICAgICAgICBzaG93X2FuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMsIHByb3BzO1xuICAgICAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICAgICdvcGFjaXR5JzogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiA4MDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAoe1xuICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZnJlc2hUb3VjaFNjcm9sbGVycygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoc2hvdykuYW5pbWF0ZShwcm9wcywgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gJChoaWRlKS5hZGRDbGFzcyhoaWRlX2NsYXNzKS5yZW1vdmVDbGFzcyhzaG93X2NsYXNzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChoaWRlKSB7XG4gICAgICAgICAgICBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgJ29wYWNpdHknOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNob3dfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZnJlc2hUb3VjaFNjcm9sbGVycygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJChoaWRlKS5hbmltYXRlKHByb3BzLCBvcHRpb25zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd19hbmltYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgJChzaG93KS5yZW1vdmVDbGFzcyhoaWRlX2NsYXNzKS5hZGRDbGFzcyhzaG93X2NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGlkZSkge1xuICAgICAgICAgICQoaGlkZSkuYWRkQ2xhc3MoaGlkZV9jbGFzcykucmVtb3ZlQ2xhc3Moc2hvd19jbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgICQoJy5qc19mb2xkZXJfZWRpdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBmb2xkZXJfaWQ7XG4gICAgICBmb2xkZXJfaWQgPSAkKHRoaXMpLmRhdGEoJ2ZvbGRlci1pZCcpO1xuICAgICAgJCgnI2ZvbGRlcl9kZWxldGVfbGluaycpLmF0dHIoJ2RhdGEtZm9sZGVyLWlkJywgZm9sZGVyX2lkKTtcbiAgICAgICQoJyNmb2xkZXJfZGVsZXRlX2xpbmsnKS5hdHRyKCdocmVmJywgXCIvZGVsZXRlX2ZvbGRlcj9mb2xkZXJfaWQ9XCIgKyBmb2xkZXJfaWQpO1xuICAgICAgJCgnI2ZvbGRlcl9lZGl0X2Zvcm0nKS5hdHRyKCdhY3Rpb24nLCAkKHRoaXMpLmRhdGEoJ2ZvbGRlci1hY3Rpb24nKSk7XG4gICAgICAkKCcjZm9sZGVyX2VkaXRfdGl0bGUnKS52YWwoJCh0aGlzKS5kYXRhKCdmb2xkZXItdGl0bGUnKSk7XG4gICAgICBpZiAoJCh0aGlzKS5kYXRhKCdmb2xkZXItc3luYy10by1pcGhvbmUnKSkge1xuICAgICAgICAkKCcjZm9sZGVyX3N5bmNfdG9faXBob25lJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKCEkKHRoaXMpLmRhdGEoJ2ZvbGRlci1zeW5jLXRvLWlwaG9uZScpKSB7XG4gICAgICAgICQoJyNmb2xkZXJfc3luY190b19pcGhvbmUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5qc19mb2xkZXJfZGVsZXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZm9sZGVyIGFuZCBhbGwgb2YgaXRzIGNvbnRlbnRzP1wiKSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIHVwZGF0ZVBhZ2VIZWFkZXJNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRfYXJ0aWNsZXMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgJCgnI211bHRpX2FjdGlvbnNfYXZhaWxhYmxlJykucmVtb3ZlQ2xhc3MoJ21vZGVfYWN0aXZlJyk7XG4gICAgICAgICQoJyNtdWx0aV9hY3Rpb25zX2F2YWlsYWJsZV9tb2JpbGUnKS5yZW1vdmVDbGFzcygnbW9kZV9hY3RpdmUnKTtcbiAgICAgICAgJCgnI3NlYXJjaF9hdmFpbGFibGUnKS5hZGRDbGFzcygnbW9kZV9hY3RpdmUnKTtcbiAgICAgICAgcmV0dXJuICQoJyNtdWx0aV9zZWxlY3RfY291bnQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjbXVsdGlfc2VsZWN0X2NvdW50X3ZhbHVlJykudGV4dChzZWxlY3RlZF9hcnRpY2xlcy5sZW5ndGgpO1xuICAgICAgICAkKCcjbXVsdGlfc2VsZWN0X2NvdW50X3ZhbHVlX21vYmlsZScpLnRleHQoc2VsZWN0ZWRfYXJ0aWNsZXMubGVuZ3RoKTtcbiAgICAgICAgJCgnI3NlYXJjaF9hdmFpbGFibGUnKS5yZW1vdmVDbGFzcygnbW9kZV9hY3RpdmUnKTtcbiAgICAgICAgJCgnI211bHRpX2FjdGlvbnNfYXZhaWxhYmxlJykuYWRkQ2xhc3MoJ21vZGVfYWN0aXZlJyk7XG4gICAgICAgICQoJyNtdWx0aV9hY3Rpb25zX2F2YWlsYWJsZV9tb2JpbGUnKS5hZGRDbGFzcygnbW9kZV9hY3RpdmUnKTtcbiAgICAgICAgcmV0dXJuICQoJyNtdWx0aV9zZWxlY3RfY291bnQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0b2dnbGVBcnRpY2xlU2VsZWN0ID0gZnVuY3Rpb24oYXJ0aWNsZV9pZCwgZm9yY2Vfc2VsZWN0LCBmb3JjZV9kZXNlbGVjdCkge1xuICAgICAgdmFyIHNlbGVjdGVkO1xuICAgICAgaWYgKGZvcmNlX3NlbGVjdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcmNlX3NlbGVjdCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGZvcmNlX2Rlc2VsZWN0ID09IG51bGwpIHtcbiAgICAgICAgZm9yY2VfZGVzZWxlY3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGFydGljbGVfaWQgPSBhcnRpY2xlX2lkID09PSB2b2lkIDAgPyBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYXJ0aWNsZS1pZCcpKSA6IGFydGljbGVfaWQ7XG4gICAgICBzZWxlY3RlZCA9ICQodGhpcykuYXR0cignZGF0YS1zZWxlY3RlZCcpO1xuICAgICAgaWYgKCFmb3JjZV9kZXNlbGVjdCAmJiAoc2VsZWN0ZWQgPT09ICdmYWxzZScgfHwgZm9yY2Vfc2VsZWN0KSkge1xuICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAoX19pbmRleE9mLmNhbGwoc2VsZWN0ZWRfYXJ0aWNsZXMsIGFydGljbGVfaWQpIDwgMCkge1xuICAgICAgICAgIHNlbGVjdGVkX2FydGljbGVzLnB1c2goYXJ0aWNsZV9pZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZm9yY2Vfc2VsZWN0ICYmIChzZWxlY3RlZCA9PT0gJ3RydWUnIHx8IGZvcmNlX2Rlc2VsZWN0KSkge1xuICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgc2VsZWN0ZWRfYXJ0aWNsZXMgPSBzZWxlY3RlZF9hcnRpY2xlcy5maWx0ZXIoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICByZXR1cm4gaWQgIT09IGFydGljbGVfaWQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVwZGF0ZVBhZ2VIZWFkZXJNb2RlKCk7XG4gICAgfTtcbiAgICBzZWxlY3RBbGxBcnRpY2xlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICQoJy5hcnRpY2xlX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0b2dnbGVBcnRpY2xlU2VsZWN0LmJpbmQodGhpcykodm9pZCAwLCB0cnVlLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGRlc2VsZWN0QWxsQXJ0aWNsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKCcuYXJ0aWNsZV9pdGVtJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICByZXR1cm4gdG9nZ2xlQXJ0aWNsZVNlbGVjdC5iaW5kKHRoaXMpKHZvaWQgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICAkKCcuanNfc2VsZWN0X2FsbF9hcnRpY2xlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBzZWxlY3RBbGxBcnRpY2xlcygpO1xuICAgIH0pO1xuICAgICQoJy5qc19kZXNlbGVjdF9hbGxfYXJ0aWNsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZGVzZWxlY3RBbGxBcnRpY2xlcygpO1xuICAgIH0pO1xuICAgICQoJy5qc190aXRsZV9yb3cgYSwgLmpzX2RvbWFpbl9saW5rb3V0LCAuanNfaGlnaGxpZ2h0X3RleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoJCgnLmFydGljbGVfaXRlbScpLmhhc0NsYXNzKCdzZWxlY3RlZCcpIHx8ICQoJ2JvZHknKS5oYXNDbGFzcygnbW9iaWxlX2VkaXRfbW9kZScpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlbW92ZUFydGljbGVGcm9tVmlldyA9IGZ1bmN0aW9uKGFydGljbGVfaWQpIHtcbiAgICAgIHZhciAkYXJ0aWNsZV9pdGVtO1xuICAgICAgJGFydGljbGVfaXRlbSA9ICQoXCIjYXJ0aWNsZV9cIiArIGFydGljbGVfaWQpO1xuICAgICAgJGFydGljbGVfaXRlbS5hZGRDbGFzcygnbW92ZV9sZWZ0Jyk7XG4gICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICRhcnRpY2xlX2l0ZW0ucmVtb3ZlKCk7XG4gICAgICAgIHVwZGF0ZUFydGljbGVQb3BvdmVyUGxhY2VtZW50KCcuYXJ0aWNsZV9pdGVtJyk7XG4gICAgICAgIHVwZGF0ZUVtcHR5Tm90aWNlKCk7XG4gICAgICAgIHJldHVybiByZWZyZXNoVG91Y2hTY3JvbGxlcnMoKTtcbiAgICAgIH0pLCByZW1vdmVfYXJ0aWNsZV9hbmltYXRpb25fZHVyYXRpb24pO1xuICAgIH07XG4gICAgcmVtb3ZlQWxsQXJ0aWNsZXNGcm9tVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgJCgnLmFydGljbGVfaXRlbScpLmFkZENsYXNzKCdtb3ZlX2xlZnQnKTtcbiAgICAgIHNlbGVjdGVkX2FydGljbGVzID0gW107XG4gICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5hcnRpY2xlX2l0ZW0nKS5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlQXJ0aWNsZVBvcG92ZXJQbGFjZW1lbnQoJy5hcnRpY2xlX2l0ZW0nKTtcbiAgICAgICAgdXBkYXRlRW1wdHlOb3RpY2UoKTtcbiAgICAgICAgcmV0dXJuIHJlZnJlc2hUb3VjaFNjcm9sbGVycygpO1xuICAgICAgfSksIHJlbW92ZV9hcnRpY2xlX2FuaW1hdGlvbl9kdXJhdGlvbik7XG4gICAgfTtcbiAgICB1cGRhdGVBcnRpY2xlUG9wb3ZlclBsYWNlbWVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAyKSB7XG4gICAgICAgICAgcmV0dXJuICQodGhpcykuZmluZCgnLmpzX3BvcG92ZXInKS5hdHRyKCdkYXRhLXBsYWNlbWVudCcsICdib3R0b20nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJCh0aGlzKS5maW5kKCcuanNfcG9wb3ZlcicpLmF0dHIoJ2RhdGEtcGxhY2VtZW50JywgJ3RvcCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHVwZGF0ZUVtcHR5Tm90aWNlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCgnLmFydGljbGVfaXRlbScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuICQoJyNlbXB0eV9ub3RpY2UnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICQoJyNlbXB0eV9ub3RpY2UnKS5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgIH07XG4gICAgZmlyZUJhdGNoT3BlcmF0aW9uID0gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIGFjdGlvbiwgZm9sZGVyX2lkO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNlbGVjdGVkX2FydGljbGVzLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFjdGlvbiA9ICQodGhpcykuYXR0cignZGF0YS1hY3Rpb24nKTtcbiAgICAgIGZvbGRlcl9pZCA9ICQodGhpcykuYXR0cignZGF0YS1mb2xkZXItaWQnKTtcbiAgICAgIGZvbGRlcl9pZCA9IGZvbGRlcl9pZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBmb2xkZXJfaWQ7XG4gICAgICByZXR1cm4gYmF0Y2hNb2RpZnlBcnRpY2xlcyhhY3Rpb24sIHNlbGVjdGVkX2FydGljbGVzLCBmb2xkZXJfaWQpO1xuICAgIH07XG4gICAgYmF0Y2hNb2RpZnlBcnRpY2xlcyA9IGZ1bmN0aW9uKGFjdGlvbiwgYXJ0aWNsZXMsIGZvbGRlcl9pZCkge1xuICAgICAgdmFyICRlbGVtZW50LCBhY3Rpb25fbmFtZSwgY291bnQsIGRhdGEsIGVycm9yLCBldmVudCwgaHJlZiwgbm91biwgc3VjY2VzcztcbiAgICAgIGlmIChmb2xkZXJfaWQgPT0gbnVsbCkge1xuICAgICAgICBmb2xkZXJfaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYXJ0aWNsZXMgPT09ICdvYmplY3QnICYmIGFydGljbGVzLmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgZXZlbnQgPSBhcnRpY2xlcztcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRlbGVtZW50ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgYXJ0aWNsZXMgPSAkZWxlbWVudC5hdHRyKCdkYXRhLWFydGljbGUtaWQnKTtcbiAgICAgICAgZm9sZGVyX2lkID0gJGVsZW1lbnQuYXR0cignZGF0YS1mb2xkZXItaWQnKTtcbiAgICAgIH1cbiAgICAgIGFydGljbGVzID0gdHlwZW9mIGFydGljbGVzID09PSAnbnVtYmVyJyA/IFthcnRpY2xlc10gOiBhcnRpY2xlcztcbiAgICAgIGFydGljbGVzID0gdHlwZW9mIGFydGljbGVzID09PSAnc3RyaW5nJyA/IFtwYXJzZUludChhcnRpY2xlcyldIDogYXJ0aWNsZXM7XG4gICAgICBpZiAoIShhcnRpY2xlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcImFyY2hpdmVcIikge1xuICAgICAgICBocmVmID0gXCIvYXJjaGl2ZV9hcnRpY2xlc1wiO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwibW92ZVwiKSB7XG4gICAgICAgIGlmIChmb2xkZXJfaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGhyZWYgPSBcIi9tb3ZlX2FydGljbGVzL1wiICsgZm9sZGVyX2lkO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwidW5hcmNoaXZlXCIpIHtcbiAgICAgICAgaHJlZiA9IFwiL3VuYXJjaGl2ZV9hcnRpY2xlc1wiO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgaHJlZiA9IFwiL2RlbGV0ZV9hcnRpY2xlc1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYWN0aW9uX25hbWUgPSBhY3Rpb247XG4gICAgICBpZiAoYXJ0aWNsZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBhY3Rpb25fbmFtZSA9ICdidWxrICcgKyBhY3Rpb247XG4gICAgICB9XG4gICAgICBnYUxvZygndW5yZWFkJywgYWN0aW9uX25hbWUpO1xuICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgIHN1Y2Nlc3MgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB2YXIgYXJ0aWNsZV9pZCwgX2ksIF9sZW47XG4gICAgICAgIGRlc2VsZWN0QWxsQXJ0aWNsZXMoKTtcbiAgICAgICAgc2VsZWN0ZWRfYXJ0aWNsZXMgPSBbXTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBhcnRpY2xlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgIGFydGljbGVfaWQgPSBhcnRpY2xlc1tfaV07XG4gICAgICAgICAgcmVtb3ZlQXJ0aWNsZUZyb21WaWV3KGFydGljbGVfaWQpO1xuICAgICAgICB9XG4gICAgICAgIGFydGljbGVzID0gW107XG4gICAgICAgIHJldHVybiByZWZyZXNoVG91Y2hTY3JvbGxlcnMoKTtcbiAgICAgIH07XG4gICAgICBlcnJvciA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGRlc2VsZWN0QWxsQXJ0aWNsZXMoKTtcbiAgICAgICAgYXJ0aWNsZXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkX2FydGljbGVzID0gW107XG4gICAgICB9O1xuICAgICAgY291bnQgPSBhcnRpY2xlcy5sZW5ndGg7XG4gICAgICBub3VuID0gY291bnQgPT09IDEgPyBcImFydGljbGVcIiA6IFwiYXJ0aWNsZXNcIjtcbiAgICAgIGNvdW50ID0gY291bnQgPT09IDEgPyBcInRoaXNcIiA6IGNvdW50O1xuICAgICAgZGF0YSA9IGFydGljbGVzO1xuICAgICAgaWYgKGFjdGlvbiAhPT0gXCJkZWxldGVcIiB8fCBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHBlcm1hbmVudGx5IGRlbGV0ZSBcIiArIGNvdW50ICsgXCIgXCIgKyBub3VuICsgXCI/XCIpKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBocmVmLFxuICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXG4gICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgJCgnLmpzX2FyY2hpdmVfc2luZ2xlJykub24oJ2NsaWNrJywgYmF0Y2hNb2RpZnlBcnRpY2xlcy5iaW5kKG51bGwsICdhcmNoaXZlJykpO1xuICAgICQoJy5qc19yZXN0b3JlX3NpbmdsZScpLm9uKCdjbGljaycsIGJhdGNoTW9kaWZ5QXJ0aWNsZXMuYmluZChudWxsLCAndW5hcmNoaXZlJykpO1xuICAgICQoJy5qc19kZWxldGVfc2luZ2xlJykub24oJ2NsaWNrJywgYmF0Y2hNb2RpZnlBcnRpY2xlcy5iaW5kKG51bGwsICdkZWxldGUnKSk7XG4gICAgJCgnLmpzX21vdmVfc2luZ2xlJykub24oJ2NsaWNrJywgYmF0Y2hNb2RpZnlBcnRpY2xlcy5iaW5kKG51bGwsICdtb3ZlJykpO1xuICAgICQoJy5qc19iYXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBmaXJlQmF0Y2hPcGVyYXRpb24uYmluZCh0aGlzKShlKTtcbiAgICB9KTtcbiAgICAkKCcuanNfbW92ZV9iYXRjaF9wb3BvdmVyJykub24oJ3Nob3duLmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKCcucG9wb3ZlciAuanNfYmF0Y2gnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBmaXJlQmF0Y2hPcGVyYXRpb24uYmluZCh0aGlzKShlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgICQoJy5qc19tb3ZlX3NpbmdsZV9wb3BvdmVyJykub24oJ3Nob3duLmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKCcucG9wb3ZlciAuanNfbW92ZV9zaW5nbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBiYXRjaE1vZGlmeUFydGljbGVzLmJpbmQodGhpcywgJ21vdmUnKShlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKCcmJywgJyZhbXA7JykucmVwbGFjZSgnPCcsICcmbHQ7JykucmVwbGFjZSgnPicsICcmZ3Q7Jyk7XG4gICAgfTtcbiAgICBhZGRGb2xkZXIgPSBmdW5jdGlvbihmb2xkZXIpIHtcbiAgICAgIHZhciBkaXNwbGF5X3RpdGxlLCBpZCwgc2x1ZywgdHBsO1xuICAgICAgaWYgKGZvbGRlciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlkID0gZm9sZGVyWydmb2xkZXJfaWQnXTtcbiAgICAgIHNsdWcgPSBmb2xkZXJbJ3NsdWcnXTtcbiAgICAgIGRpc3BsYXlfdGl0bGUgPSBlc2NhcGVTdHJpbmcoZm9sZGVyWydkaXNwbGF5X3RpdGxlJ10pO1xuICAgICAgdHBsID0gXCI8bGkgaWQ9J2ZvbGRlcl9cIiArIGlkICsgXCInIGRyYWdnYWJsZT0ndHJ1ZScgZGF0YS1mb2xkZXItaWQ9J1wiICsgaWQgKyBcIicgY2xhc3M9J2pzX2ZvbGRlcl9pdGVtIHNpZGVfaXRlbSBmb2xkZXJfaXRlbSBkcm9wdGFyZ2V0IGRyb3B0YXJnZXRfZm9sZGVyJz4gPGEgaHJlZj0nL3UvZm9sZGVyL1wiICsgaWQgKyBcIi9cIiArIHNsdWcgKyBcIic+IDxpIGNsYXNzPSdpcGljb24gaXBpY29uLWZvbGRlcic+PC9pPiBcIiArIGRpc3BsYXlfdGl0bGUgKyBcIiA8L2E+PC9saT5cIjtcbiAgICAgICQoJyNmb2xkZXJzJykuYXBwZW5kKHRwbCk7XG4gICAgICBhdHRhY2hGb2xkZXJEcmFnRHJvcEV2ZW50cyhcIiNmb2xkZXJfXCIgKyBpZCk7XG4gICAgICByZXR1cm4gdXBkYXRlU2Nyb2xsYWJsZU1heEhlaWdodCgpO1xuICAgIH07XG4gICAgcmVzZXRGb2xkZXJBZGQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkZm9ybSwgJHRpdGxlSW5wdXQ7XG4gICAgICAkZm9ybSA9ICQoJyNmb2xkZXJfaW5saW5lX2FkZCcpO1xuICAgICAgJHRpdGxlSW5wdXQgPSAkZm9ybS5maW5kKCdpbnB1dFt0eXBlPXRleHRdJyk7XG4gICAgICAkdGl0bGVJbnB1dC52YWwoJycpO1xuICAgICAgJHRpdGxlSW5wdXQuYmx1cigpO1xuICAgICAgJHRpdGxlSW5wdXQudG9vbHRpcCgnZGVzdHJveScpO1xuICAgICAgcmV0dXJuIGZvcmNlVG91Y2hPcmlnaW5TY3JvbGxQb3NpdGlvbigpO1xuICAgIH07XG4gICAgJCgnLmpzX2ZvbGRlcl9pbmxpbmVfYWRkX2ZpZWxkJykub24oJ2ZvY3VzIGNsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICQodGhpcykuYXR0cigncGxhY2Vob2xkZXInLCAnTmV3IEZvbGRlcicpO1xuICAgICAgcmV0dXJuICQoJyNmb2xkZXJfaW5saW5lX2FkZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAkKCcuanNfZm9sZGVyX2lubGluZV9hZGRfZmllbGQnKS5vbignYmx1cicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICQodGhpcykuYXR0cigncGxhY2Vob2xkZXInLCAnQWRkIEZvbGRlcicpO1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgICAgcmV0dXJuICQoJyNmb2xkZXJfaW5saW5lX2FkZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAkKCcjZm9sZGVyX2lubGluZV9hZGQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyICR0aXRsZUlucHV0LCBkYXRhLCBmb3JtX2tleSwgaHJlZiwgdGl0bGU7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBocmVmID0gJCh0aGlzKS5hdHRyKCdhY3Rpb24nKTtcbiAgICAgICR0aXRsZUlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dFt0eXBlPXRleHRdJyk7XG4gICAgICB0aXRsZSA9ICR0aXRsZUlucHV0LnZhbCgpO1xuICAgICAgZm9ybV9rZXkgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9Zm9ybV9rZXldJykudmFsKCk7XG4gICAgICBkYXRhID0ge1xuICAgICAgICBcImZvbGRlclt0aXRsZV1cIjogdGl0bGUsXG4gICAgICAgIFwiYWpheFwiOiAxLFxuICAgICAgICBcImZvcm1fa2V5XCI6IGZvcm1fa2V5XG4gICAgICB9O1xuICAgICAgcmV0dXJuICQucG9zdChocmVmLCBkYXRhKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlLCBzdGF0dXM7XG4gICAgICAgIHN0YXR1cyA9IGRhdGFbJ3N0YXR1cyddO1xuICAgICAgICByZXNwb25zZSA9IGRhdGFbJ3Jlc3BvbnNlJ107XG4gICAgICAgIGlmIChzdGF0dXMuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgYWRkRm9sZGVyKHJlc3BvbnNlLmZvbGRlcik7XG4gICAgICAgICAgcmV0dXJuIHJlc2V0Rm9sZGVyQWRkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRpdGxlSW5wdXQudG9vbHRpcCh7XG4gICAgICAgICAgICB0aXRsZTogc3RhdHVzLmVycm9ycy5qb2luKCcgJyksXG4gICAgICAgICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgICAgICAgIHRyaWdnZXI6ICdmb2N1cydcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkdGl0bGVJbnB1dC50b29sdGlwKCdzaG93Jyk7XG4gICAgICAgICAgcmV0dXJuICQoJyNmb2xkZXJfaW5saW5lX2FkZF9maWVsZCcpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcykudG9vbHRpcCgnZGVzdHJveScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KS5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge30pO1xuICAgIH0pO1xuICAgICQoJyNmb2xkZXJfaW5saW5lX2FkZF9maWVsZCcpLm9uKCdibHVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGZvcmNlVG91Y2hPcmlnaW5TY3JvbGxQb3NpdGlvbigpO1xuICAgIH0pO1xuICAgIGRyYWdfZGF0YSA9IHt9O1xuICAgIGlmIChzaG91bGRFbmFibGVEcmFnQW5kRHJvcCgpKSB7XG4gICAgICAkKCcuanNfYXJ0aWNsZV9pdGVtJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGFpZCwgYXJ0aWNsZV9pZCwgaW1nLCBfaSwgX2xlbjtcbiAgICAgICAgaWYgKGlzUG9wb3ZlckFjdGl2ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgYXJ0aWNsZV9pZCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnYXJ0aWNsZS1pZCcpKTtcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgICAgICBkcmFnX2RhdGEgPSB7XG4gICAgICAgICAgZm9sZGVyX2lkOiBmYWxzZSxcbiAgICAgICAgICBhcnRpY2xlX2lkOiBhcnRpY2xlX2lkXG4gICAgICAgIH07XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2RyYWdfYWN0aXZlJyk7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc2VsZWN0ZWRfYXJ0aWNsZXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICBhaWQgPSBzZWxlY3RlZF9hcnRpY2xlc1tfaV07XG4gICAgICAgICAgJChcIiNhcnRpY2xlX1wiICsgYWlkKS5hZGRDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5kYXRhVHJhbnNmZXIgJiYgZS5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKSB7XG4gICAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkX2FydGljbGVzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBpbWcuc3JjID0gJCgnI2RyYWdfaW1hZ2VfYXJ0aWNsZV9vbmUnKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkX2FydGljbGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaW1nLnNyYyA9ICQoJyNkcmFnX2ltYWdlX2FydGljbGVfdHdvJykuYXR0cignc3JjJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZF9hcnRpY2xlcy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgaW1nLnNyYyA9ICQoJyNkcmFnX2ltYWdlX2FydGljbGVfdGhyZWUnKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGUuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShpbWcsIDIwLCAyMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJCgnLmpzX2FydGljbGVfaXRlbScpLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5hcnRpY2xlX2l0ZW0nKS5yZW1vdmVDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgcmV0dXJuICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgICAgJCgnI2FyY2hpdmVfbmF2LCAjdW5yZWFkX25hdicpLm9uKCdkcmFnbGVhdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdkcm9wdGFyZ2V0JykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQodGhpcykucmVtb3ZlQ2xhc3MoJ2RyYWdfaG92ZXInKTtcbiAgICAgIH0pO1xuICAgICAgJCgnI2FyY2hpdmVfbmF2LCAjdW5yZWFkX25hdicpLm9uKCdkcmFnb3ZlciBkcmFnZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdkcm9wdGFyZ2V0JykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZHJhZ19ob3ZlcicpO1xuICAgICAgICBlLmRhdGFUcmFuc2ZlciA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnY29weSc7XG4gICAgICAgIHJldHVybiBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICAgICAgfSk7XG4gICAgICAkKCcjdW5yZWFkX25hdicpLm9uKCdkcm9wJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgYXJ0aWNsZV9pZDtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLmRhdGFUcmFuc2ZlciA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgIGlmIChkcmFnX2RhdGEuYXJ0aWNsZV9pZCkge1xuICAgICAgICAgIGFydGljbGVfaWQgPSBkcmFnX2RhdGEuYXJ0aWNsZV9pZDtcbiAgICAgICAgfVxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcmFnX2hvdmVyJyk7XG4gICAgICAgIGlmICghKGFydGljbGVfaWQgJiYgJCh0aGlzKS5oYXNDbGFzcygnZHJvcHRhcmdldCcpKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX19pbmRleE9mLmNhbGwoc2VsZWN0ZWRfYXJ0aWNsZXMsIGFydGljbGVfaWQpID49IDApIHtcbiAgICAgICAgICBiYXRjaE1vZGlmeUFydGljbGVzKCdtb3ZlJywgc2VsZWN0ZWRfYXJ0aWNsZXMsICcwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmF0Y2hNb2RpZnlBcnRpY2xlcygnbW92ZScsIGFydGljbGVfaWQsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKCcjYXJjaGl2ZV9uYXYnKS5vbignZHJvcCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGFydGljbGVfaWQ7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgICAgICBpZiAoZHJhZ19kYXRhLmFydGljbGVfaWQpIHtcbiAgICAgICAgICBhcnRpY2xlX2lkID0gZHJhZ19kYXRhLmFydGljbGVfaWQ7XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZHJhZ19ob3ZlcicpO1xuICAgICAgICBpZiAoIShhcnRpY2xlX2lkICYmICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3B0YXJnZXQnKSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9faW5kZXhPZi5jYWxsKHNlbGVjdGVkX2FydGljbGVzLCBhcnRpY2xlX2lkKSA+PSAwKSB7XG4gICAgICAgICAgYmF0Y2hNb2RpZnlBcnRpY2xlcygnYXJjaGl2ZScsIHNlbGVjdGVkX2FydGljbGVzLCAnMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhdGNoTW9kaWZ5QXJ0aWNsZXMoJ2FyY2hpdmUnLCBhcnRpY2xlX2lkLCAnMCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtb3ZlRm9sZGVyUG9zaXRpb24gPSBmdW5jdGlvbihhbmNob3JfZm9sZGVyX2lkLCBtb3ZpbmdfZm9sZGVyX2lkLCBhYm92ZV9hbmNob3IpIHtcbiAgICAgIHZhciAkYW5jaG9yX2ZvbGRlciwgJG1vdmluZ19mb2xkZXIsIGRhdGEsIGZvbGRlcl9saXN0LCBocmVmLCBzdWNjZXNzO1xuICAgICAgaWYgKGFib3ZlX2FuY2hvciA9PSBudWxsKSB7XG4gICAgICAgIGFib3ZlX2FuY2hvciA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoYW5jaG9yX2ZvbGRlcl9pZCA9PT0gbW92aW5nX2ZvbGRlcl9pZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAkYW5jaG9yX2ZvbGRlciA9ICQoXCIjZm9sZGVyX1wiICsgYW5jaG9yX2ZvbGRlcl9pZCk7XG4gICAgICAkbW92aW5nX2ZvbGRlciA9ICQoXCIjZm9sZGVyX1wiICsgbW92aW5nX2ZvbGRlcl9pZCk7XG4gICAgICAkbW92aW5nX2ZvbGRlci5yZW1vdmUoKTtcbiAgICAgIGlmIChhYm92ZV9hbmNob3IpIHtcbiAgICAgICAgJG1vdmluZ19mb2xkZXIuaW5zZXJ0QmVmb3JlKCRhbmNob3JfZm9sZGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRtb3ZpbmdfZm9sZGVyLmluc2VydEFmdGVyKCRhbmNob3JfZm9sZGVyKTtcbiAgICAgIH1cbiAgICAgIGZvbGRlcl9saXN0ID0gW107XG4gICAgICAkKCcjZm9sZGVycyBsaScpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZvbGRlcl9saXN0LnB1c2gocGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdmb2xkZXItaWQnKSkpO1xuICAgICAgfSk7XG4gICAgICBocmVmID0gJy9zZXRfZm9sZGVyX29yZGVyJztcbiAgICAgIGRhdGEgPSBmb2xkZXJfbGlzdDtcbiAgICAgIHN1Y2Nlc3MgPSBmdW5jdGlvbihyZXNwb25zZSkge307XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBocmVmLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgc3VjY2Vzczogc3VjY2Vzc1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYXR0YWNoRm9sZGVyRHJhZ0Ryb3BFdmVudHMoJy5qc19mb2xkZXJfaXRlbScpO1xuICAgIH07XG4gICAgbWFya0ZvbGRlckRyb3BQb3NpdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBkaWZmLCBoZWlnaHQsIG1vdXNlWSwgb2Zmc2V0LCBvZmZzZXRUb3A7XG4gICAgICBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpO1xuICAgICAgaGVpZ2h0ID0gJCh0aGlzKS5oZWlnaHQoKTtcbiAgICAgIG1vdXNlWSA9IGUub3JpZ2luYWxFdmVudC5wYWdlWTtcbiAgICAgIG9mZnNldFRvcCA9IG9mZnNldC50b3A7XG4gICAgICBkaWZmID0gKG9mZnNldC50b3AgKyBoZWlnaHQpIC0gbW91c2VZO1xuICAgICAgaWYgKGRpZmYgPCAoaGVpZ2h0IC8gMikpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZHJhZ19ob3Zlcl9mb2xkZXJfYWJvdmUnKTtcbiAgICAgICAgcmV0dXJuICQodGhpcykuYWRkQ2xhc3MoJ2RyYWdfaG92ZXJfZm9sZGVyX2JlbG93Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcmFnX2hvdmVyX2ZvbGRlcl9iZWxvdycpO1xuICAgICAgICByZXR1cm4gJCh0aGlzKS5hZGRDbGFzcygnZHJhZ19ob3Zlcl9mb2xkZXJfYWJvdmUnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGF0dGFjaEZvbGRlckRyYWdEcm9wRXZlbnRzID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgIGlmIChzaG91bGRFbmFibGVEcmFnQW5kRHJvcCgpKSB7XG4gICAgICAgICQoc2VsZWN0b3IpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGlzUG9wb3ZlckFjdGl2ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgICBkcmFnX2RhdGEgPSB7XG4gICAgICAgICAgICBhcnRpY2xlX2lkOiBmYWxzZSxcbiAgICAgICAgICAgIGZvbGRlcl9pZDogcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdmb2xkZXItaWQnKSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIGUuZGF0YVRyYW5zZmVyID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgICAgcmV0dXJuICQodGhpcykuYWRkQ2xhc3MoJ2RyYWdfYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHNlbGVjdG9yKS5vbignZHJhZ2VuZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2RyYWdfYWN0aXZlJyk7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgICAkKHNlbGVjdG9yKS5yZW1vdmVDbGFzcygnZHJhZ19ob3ZlcicpO1xuICAgICAgICAgICQoc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdkcmFnX2hvdmVyX2ZvbGRlcl9hYm92ZScpO1xuICAgICAgICAgIHJldHVybiAkKHNlbGVjdG9yKS5yZW1vdmVDbGFzcygnZHJhZ19ob3Zlcl9mb2xkZXJfYmVsb3cnKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoc2VsZWN0b3IpLm9uKCdkcmFnbGVhdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIGFydGljbGVfaWQsIGZvbGRlcl9pZDtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZS5kYXRhVHJhbnNmZXIgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgICAgICAgIGlmIChkcmFnX2RhdGEuYXJ0aWNsZV9pZCkge1xuICAgICAgICAgICAgYXJ0aWNsZV9pZCA9IGRyYWdfZGF0YS5hcnRpY2xlX2lkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZHJhZ19kYXRhLmZvbGRlcl9pZCkge1xuICAgICAgICAgICAgZm9sZGVyX2lkID0gZHJhZ19kYXRhLmZvbGRlcl9pZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFydGljbGVfaWQgJiYgJCh0aGlzKS5oYXNDbGFzcygnZHJvcHRhcmdldCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcmFnX2hvdmVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmb2xkZXJfaWQgJiYgJCh0aGlzKS5oYXNDbGFzcygnZHJvcHRhcmdldF9mb2xkZXInKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZHJhZ19ob3Zlcl9mb2xkZXJfYWJvdmUnKTtcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcmFnX2hvdmVyX2ZvbGRlcl9iZWxvdycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoc2VsZWN0b3IpLm9uKCdkcmFnZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIGFydGljbGVfaWQsIGZvbGRlcl9pZDtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZS5kYXRhVHJhbnNmZXIgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgICBpZiAoZHJhZ19kYXRhLmFydGljbGVfaWQpIHtcbiAgICAgICAgICAgIGFydGljbGVfaWQgPSBkcmFnX2RhdGEuYXJ0aWNsZV9pZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRyYWdfZGF0YS5mb2xkZXJfaWQpIHtcbiAgICAgICAgICAgIGZvbGRlcl9pZCA9IGRyYWdfZGF0YS5mb2xkZXJfaWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnRpY2xlX2lkICYmICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3B0YXJnZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcykuYWRkQ2xhc3MoJ2RyYWdfaG92ZXInKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRlcl9pZCAmJiAkKHRoaXMpLmhhc0NsYXNzKCdkcm9wdGFyZ2V0X2ZvbGRlcicpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFya0ZvbGRlckRyb3BQb3NpdGlvbi5iaW5kKHRoaXMpKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoc2VsZWN0b3IpLm9uKCdkcmFnb3ZlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgYXJ0aWNsZV9pZCwgZm9sZGVyX2lkO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoZHJhZ19kYXRhLmFydGljbGVfaWQpIHtcbiAgICAgICAgICAgIGFydGljbGVfaWQgPSBkcmFnX2RhdGEuYXJ0aWNsZV9pZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRyYWdfZGF0YS5mb2xkZXJfaWQpIHtcbiAgICAgICAgICAgIGZvbGRlcl9pZCA9IGRyYWdfZGF0YS5mb2xkZXJfaWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnRpY2xlX2lkICYmICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3B0YXJnZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICQodGhpcykuYWRkQ2xhc3MoJ2RyYWdfaG92ZXInKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRlcl9pZCAmJiAkKHRoaXMpLmhhc0NsYXNzKCdkcm9wdGFyZ2V0X2ZvbGRlcicpKSB7XG4gICAgICAgICAgICBlLmRhdGFUcmFuc2ZlciA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgICAgICAgIHJldHVybiBtYXJrRm9sZGVyRHJvcFBvc2l0aW9uLmJpbmQodGhpcykoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJChzZWxlY3Rvcikub24oJ2RyYWcnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAkKHNlbGVjdG9yKS5vbignZHJvcCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgYWJvdmVfYW5jaG9yLCBhbmNob3JfZm9sZGVyX2lkLCBhcnRpY2xlX2lkLCBmb2xkZXJfaWQsIHRhcmdldF9mb2xkZXJfaWQ7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuZGF0YVRyYW5zZmVyID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgICAgaWYgKGRyYWdfZGF0YS5hcnRpY2xlX2lkKSB7XG4gICAgICAgICAgICBhcnRpY2xlX2lkID0gZHJhZ19kYXRhLmFydGljbGVfaWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkcmFnX2RhdGEuZm9sZGVyX2lkKSB7XG4gICAgICAgICAgICBmb2xkZXJfaWQgPSBkcmFnX2RhdGEuZm9sZGVyX2lkO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKHNlbGVjdG9yKS5yZW1vdmVDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgICAkKHNlbGVjdG9yKS5yZW1vdmVDbGFzcygnZHJhZ19ob3ZlcicpO1xuICAgICAgICAgIGlmIChhcnRpY2xlX2lkICYmICQodGhpcykuaGFzQ2xhc3MoJ2Ryb3B0YXJnZXQnKSkge1xuICAgICAgICAgICAgdGFyZ2V0X2ZvbGRlcl9pZCA9ICQodGhpcykuZGF0YSgnZm9sZGVyLWlkJyk7XG4gICAgICAgICAgICBpZiAoX19pbmRleE9mLmNhbGwoc2VsZWN0ZWRfYXJ0aWNsZXMsIGFydGljbGVfaWQpID49IDApIHtcbiAgICAgICAgICAgICAgYmF0Y2hNb2RpZnlBcnRpY2xlcygnbW92ZScsIHNlbGVjdGVkX2FydGljbGVzLCB0YXJnZXRfZm9sZGVyX2lkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJhdGNoTW9kaWZ5QXJ0aWNsZXMoJ21vdmUnLCBhcnRpY2xlX2lkLCB0YXJnZXRfZm9sZGVyX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRlcl9pZCAmJiAkKHRoaXMpLmhhc0NsYXNzKCdkcm9wdGFyZ2V0X2ZvbGRlcicpKSB7XG4gICAgICAgICAgICBhbmNob3JfZm9sZGVyX2lkID0gJCh0aGlzKS5kYXRhKCdmb2xkZXItaWQnKTtcbiAgICAgICAgICAgIGFib3ZlX2FuY2hvciA9ICQodGhpcykuaGFzQ2xhc3MoJ2RyYWdfaG92ZXJfZm9sZGVyX2Fib3ZlJyk7XG4gICAgICAgICAgICBtb3ZlRm9sZGVyUG9zaXRpb24oYW5jaG9yX2ZvbGRlcl9pZCwgZm9sZGVyX2lkLCBhYm92ZV9hbmNob3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkcmFnX2RhdGEgPSB7fTtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcmFnX2hvdmVyJykucmVtb3ZlQ2xhc3MoJ2RyYWdfaG92ZXJfZm9sZGVyX2Fib3ZlJykucmVtb3ZlQ2xhc3MoJ2RyYWdfaG92ZXJfZm9sZGVyX2JlbG93Jyk7XG4gICAgICAgICAgcmV0dXJuICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnZHJhZ19hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAod2luZG93Lm9ub3JpZW50YXRpb25jaGFuZ2UpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXNldEludGVyZmFjZSgpO1xuICAgICAgICAgIHVwZGF0ZVNjcm9sbGFibGVNYXhIZWlnaHQoKTtcbiAgICAgICAgICByZWZyZXNoVG91Y2hTY3JvbGxlcnMoKTtcbiAgICAgICAgICB1cGRhdGVBcnRpY2xlSXRlbVNlbGVjdEhhbmRsZXJzKCk7XG4gICAgICAgICAgcmV0dXJuIGZvcmNlVG91Y2hPcmlnaW5TY3JvbGxQb3NpdGlvbigpO1xuICAgICAgICB9KSwgMjAwKTtcbiAgICAgIH0pLCBmYWxzZSk7XG4gICAgfVxuICAgICQoJy5qc19zZWxlY3RfYWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuICQodGhpcykuc2VsZWN0KCk7XG4gICAgfSk7XG4gICAgJCgnLmpzX3Nob3dfaGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBzaG93SGlkZS5iaW5kKHRoaXMpKGUpO1xuICAgIH0pO1xuICAgICQoJy5qc19zZXR0aW5nc19wb3BvdmVyJykub24oJ3Nob3duLmJzLnBvcG92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhdHRhY2hTZXR0aW5nc0hhbmRsZXJzKCcucG9wb3ZlcicpO1xuICAgIH0pO1xuICAgIGF0dGFjaFNldHRpbmdzSGFuZGxlcnMgPSBmdW5jdGlvbihwYXJlbnRfc2VsZWN0b3IpIHtcbiAgICAgIGlmIChwYXJlbnRfc2VsZWN0b3IgPT0gbnVsbCkge1xuICAgICAgICBwYXJlbnRfc2VsZWN0b3IgPSAnLnBvcG92ZXInO1xuICAgICAgfVxuICAgICAgJChcIlwiICsgcGFyZW50X3NlbGVjdG9yICsgXCIgLmpzX3N3YXRjaFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBtb2RlcywgbmV3X21vZGUsIHJlbW92ZV9tb2RlcztcbiAgICAgICAgbmV3X21vZGUgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yLW1vZGUnKTtcbiAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcyhuZXdfbW9kZSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmpzX3N3YXRjaCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJChcIi5qc19zd2F0Y2hbZGF0YS1jb2xvci1tb2RlPVwiICsgbmV3X21vZGUgKyBcIl1cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3RoZW1lc3dhcCcpO1xuICAgICAgICBtb2RlcyA9IFsnbGlnaHRtb2RlJywgJ3N0b3JtbW9kZScsICdzZXBpYW1vZGUnLCAnZGFya21vZGUnXTtcbiAgICAgICAgcmVtb3ZlX21vZGVzID0gbW9kZXMuZmlsdGVyKGZ1bmN0aW9uKG1vZGUpIHtcbiAgICAgICAgICByZXR1cm4gbW9kZSAhPT0gbmV3X21vZGU7XG4gICAgICAgIH0pO1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MocmVtb3ZlX21vZGVzLmpvaW4oJyAnKSk7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcyhuZXdfbW9kZSk7XG4gICAgICAgIGdhTG9nKCd1bnJlYWQnLCAndGhlbWUgY2hhbmdlJywgbmV3X21vZGUpO1xuICAgICAgICBjcmVhdGVDb29raWUoJ2lwdGNvbG9yJywgbmV3X21vZGUsIDM2NTApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQoXCJcIiArIHBhcmVudF9zZWxlY3RvciArIFwiIC5qc190aHVtYm5haWxfdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCd0aHVtYm5haWxzJykpIHtcbiAgICAgICAgICBnYUxvZygndGh1bWJuYWlscycsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygndGh1bWJuYWlscycpO1xuICAgICAgICAgIGNyZWF0ZUNvb2tpZSgndGh1bWJuYWlscycsICdkaXNhYmxlZCcsIDM2NTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhTG9nKCd0aHVtYm5haWxzJywgJ2VuYWJsZWQnKTtcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3RodW1ibmFpbHMnKTtcbiAgICAgICAgICBjcmVhdGVDb29raWUoJ3RodW1ibmFpbHMnLCAnZW5hYmxlZCcsIDM2NTApO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0SW50ZXJmYWNlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChcIlwiICsgcGFyZW50X3NlbGVjdG9yICsgXCIgLmpzX2xpc3R2aWV3X3RvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnY29uZGVuc2VkJykpIHtcbiAgICAgICAgICBnYUxvZygndW5yZWFkJywgJ2V4cGFuZGVkIG1vZGUnKTtcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2NvbmRlbnNlZCcpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgIGNyZWF0ZUNvb2tpZSgnbGlzdF90b2dnbGUnLCAnZXhwYW5kZWQnLCAzNjUwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYUxvZygndW5yZWFkJywgJ2NvbmRlbnNlZCBtb2RlJyk7XG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpLmFkZENsYXNzKCdjb25kZW5zZWQnKTtcbiAgICAgICAgICBjcmVhdGVDb29raWUoJ2xpc3RfdG9nZ2xlJywgJ2NvbmRlbnNlZCcsIDM2NTApO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0SW50ZXJmYWNlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChcIlwiICsgcGFyZW50X3NlbGVjdG9yICsgXCIgLm9wZW5fbW9kYWxcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gb3Blbk1vZGFsLmJpbmQodGhpcykoZSk7XG4gICAgICB9KTtcbiAgICAgICQoXCJcIiArIHBhcmVudF9zZWxlY3RvciArIFwiIC5qc19hcmNoaXZlX2FsbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBkYXRhLCBocmVmO1xuICAgICAgICBocmVmID0gJCh0aGlzKS5kYXRhKCdhY3Rpb24nKTtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXJjaGl2ZSBhbGwgaXRlbXMgaW4gdGhpcyBmb2xkZXI/XCIpKSB7XG4gICAgICAgICAgZGF0YSA9IFwiYWpheD0xXCI7XG4gICAgICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgICAgICAkLnBvc3QoaHJlZiwgZGF0YSkuc3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgZ2FMb2coJ3VucmVhZCcsICdhcmNoaXZlIGFsbCcpO1xuICAgICAgICAgICAgcmVtb3ZlQWxsQXJ0aWNsZXNGcm9tVmlldygpO1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHt9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAkKFwiXCIgKyBwYXJlbnRfc2VsZWN0b3IgKyBcIiAuanNfZGVsZXRlX2FsbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBkYXRhLCBocmVmO1xuICAgICAgICBocmVmID0gJCh0aGlzKS5kYXRhKCdhY3Rpb24nKTtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGFsbCBpdGVtcyBpbiB0aGUgYXJjaGl2ZT8gVGhpcyBhY3Rpb24gY2Fubm90IGJlIHVuZG9uZS5cIikpIHtcbiAgICAgICAgICBkYXRhID0gXCJhamF4PTFcIjtcbiAgICAgICAgICByZXNldEludGVyZmFjZSgpO1xuICAgICAgICAgICQucG9zdChocmVmLCBkYXRhKS5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZW1vdmVBbGxBcnRpY2xlc0Zyb21WaWV3KCk7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgJCgnLmpzX3NhdmVfYXJ0aWNsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBkYXRhLCBocmVmO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NhdmVkJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgZGF0YSA9IFwiYWpheD0xXCI7XG4gICAgICAkKHRoaXMpLnRleHQoJ1NhdmluZ+KApicpLmFkZENsYXNzKCdzYXZpbmcnKTtcbiAgICAgICQuZ2V0KGhyZWYsIGRhdGEsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAkKF90aGlzKS50ZXh0KCdTYXZlZCcpLmFkZENsYXNzKCdzYXZlZCcpO1xuICAgICAgICAgICQoX3RoaXMpLnJlbW92ZUF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICByZXR1cm4gJChfdGhpcykucmVtb3ZlQ2xhc3MoJ3NhdmluZycpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5ib29rbWFya2xldCwgLmpzX2Jvb2ttYXJrbGV0Jykubm90KCcuaW5hY3RpdmVfYm9va21hcmtsZXQnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiAkKCcjYm9va21hcmtsZXRfZXhwbGFpbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAkKCdib2R5Jykub24oJ21vdXNlbGVhdmUnLCAnLmJvb2ttYXJrbGV0LCAuanNfYm9va21hcmtsZXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJCgnI2Jvb2ttYXJrbGV0X2V4cGxhaW4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0sIDQwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICQoJyNib29rbWFya2xldF9leHBsYWluJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoJy5ib29rbWFya2xldCwgLmpzX2Jvb2ttYXJrbGV0Jykubm90KCcuaW5hY3RpdmVfYm9va21hcmtsZXQnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI21vYmlsZV90b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdtb2JpbGVfZXhwYW5kZWQnKSkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdtb2JpbGVfZXhwYW5kZWQnKTtcbiAgICAgICAgJCgnI2lubmVyX2NvbHVtbicpLnJlbW92ZUNsYXNzKCdtb2JpbGVfZXhwYW5kZWQnKTtcbiAgICAgICAgcmV0dXJuICQoJyN0ZXh0X2NvbHVtbicpLnJlbW92ZUNsYXNzKCdtb2JpbGVfaW5uZXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ21vYmlsZV9leHBhbmRlZCcpO1xuICAgICAgICAkKCcjaW5uZXJfY29sdW1uJykuYWRkQ2xhc3MoJ21vYmlsZV9leHBhbmRlZCcpO1xuICAgICAgICByZXR1cm4gJCgnI3RleHRfY29sdW1uJykuYWRkQ2xhc3MoJ21vYmlsZV9pbm5lcicpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoJyNzZWFyY2hlcicpLmZvY3VzKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiAkKCcjc2VhcmNoX2F2YWlsYWJsZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICAkKCcjc2VhcmNoZXInKS5ibHVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgICQoJyNzZWFyY2hfYXZhaWxhYmxlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKCd2YWx1ZScsICcnKTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlcnJvciA9IF9lcnJvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcucmVhZEFkZHJlc3MgaW5wdXQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKHRoaXMpLnNlbGVjdCgpO1xuICAgIH0pO1xuICAgICQoJy5qc19pbmZvX2Nsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQ29va2llKCd3ZWVrbHlfYmFubmVyJywgJ3JlbW92ZWQnLCAyMDApO1xuICAgIH0pO1xuICAgICQoJy5pbmFjdGl2ZV9ib29rbWFya2xldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRidXR0b24sIGRhdGEsIGhyZWY7XG4gICAgICAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgIGhyZWYgPSAkYnV0dG9uLmF0dHIoJ2hyZWYnKTtcbiAgICAgIGRhdGEgPSBcImFqYXg9MVwiO1xuICAgICAgJGJ1dHRvbi50ZXh0KCfigKYnKS5hZGRDbGFzcygnc2F2aW5nJyk7XG4gICAgICAkLmdldChocmVmLCBkYXRhLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAkYnV0dG9uLnRleHQoJ+KclCcpLmFkZENsYXNzKCdzYXZlZCcpO1xuICAgICAgICAkYnV0dG9uLnJlbW92ZUF0dHIoJ2hyZWYnKTtcbiAgICAgICAgcmV0dXJuICRidXR0b24ucmVtb3ZlQ2xhc3MoJ3NhdmluZycpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJGxvYWRlciA9ICQoJyN0b3BfbG9hZGVyJyk7XG4gICAgJCgnLnN0YXJfdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJGFydGljbGUsIGRhdGEsIGhyZWY7XG4gICAgICBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICBkYXRhID0gXCJhamF4PTFcIjtcbiAgICAgICRhcnRpY2xlID0gJCh0aGlzKS5jbG9zZXN0KCcuYXJ0aWNsZV9pdGVtJyk7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzdGFycmVkJyk7XG4gICAgICAkYXJ0aWNsZS50b2dnbGVDbGFzcygnc3RhcnJlZCcpO1xuICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgIGdhTG9nKCd1bnJlYWQnLCAnbGlrZSB0b2dnbGUnKTtcbiAgICAgICQuZ2V0KGhyZWYsIGRhdGEpLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpIHt9KS5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge30pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5zaGFyZU91dCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGgsIGwsIGxpbmssIHQsIHc7XG4gICAgICBsaW5rID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICB3ID0gNDUwO1xuICAgICAgaCA9IDUwMDtcbiAgICAgIGwgPSAoc2NyZWVuLndpZHRoIC8gMikgLSAodyAvIDIpO1xuICAgICAgdCA9IChzY3JlZW4uaGVpZ2h0IC8gMikgLSAoaCAvIDIpO1xuICAgICAgd2luZG93Lm9wZW4obGluaywgJ2xpbmsgb3V0JywgJ3dpZHRoPScgKyB3ICsgJywgaGVpZ2h0PScgKyBoICsgJywgbGVmdD0nICsgbCArICcsIHRvcD0nICsgdCArICQoJy50YWJsZVZpZXdDZWxsJykucmVtb3ZlQ2xhc3MoJ21vdmluZycpKTtcbiAgICAgICQoJy5tZW51Q29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5ldmVybm90ZVNoYXJlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJG1lbnU7XG4gICAgICAkbWVudSA9ICQodGhpcykucGFyZW50cygnLm1lbnVfY29udGFpbmVyJyk7XG4gICAgICAkbWVudS5maW5kKCcuZXZlcm5vdGVfc2hhcmVfbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcuZXZlcm5vdGVfc2hhcmVfbWVudScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5ldmVybm90ZV9zaGFyZV9tZW51IC5jYW5jZWxfYm94JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCcuZXZlcm5vdGVfc2hhcmVfbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJy5tZW51X2NvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcuc2hhcmVfdG9fZXZlcm5vdGVfZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGF0YTtcbiAgICAgIGRhdGEgPSAkKHRoaXMpLnBhcmVudHMoJy5zaGFyZV90b19ldmVybm90ZV9mb3JtJykuc2VyaWFsaXplKCk7XG4gICAgICAnJztcbiAgICAgICQoJy5ldmVybm90ZV9zaGFyZV9tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnLm1lbnVfY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJC5wb3N0KCcvdXNlci9zaGFyZV90b19ldmVybm90ZScsIGRhdGEpLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpIHt9KS5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge30pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIG9wZW5Nb2RhbCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciAkYXV0b2ZvY3VzLCAkYXV0b3NlbGVjdCwgJHRhcmdldF9tb2RhbCwgZXhwbGljaXRfYXV0b2ZvY3VzLCBmb2N1c19kZWxheSwgdGFyZ2V0O1xuICAgICAgcmVzZXRJbnRlcmZhY2UoKTtcbiAgICAgIGZvY3VzX2RlbGF5ID0gaXNUb3VjaERldmljZSA/IDEwMDAgOiAwO1xuICAgICAgJCgnLm1vZGFsJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCgnI21vZGFsX2JhY2tlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWxfYWN0aXZlJyk7XG4gICAgICB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbW9kYWwnKTtcbiAgICAgICR0YXJnZXRfbW9kYWwgPSAkKCcjJyArIHRhcmdldCk7XG4gICAgICAkdGFyZ2V0X21vZGFsLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJ2JvZHknKS5jc3MoJ21heC1oZWlnaHQnLCBcIlwiICsgd2luZG93X2hlaWdodCArIFwicHhcIik7XG4gICAgICAkYXV0b2ZvY3VzID0gJHRhcmdldF9tb2RhbC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKS5maXJzdCgpO1xuICAgICAgZXhwbGljaXRfYXV0b2ZvY3VzID0gJCh0aGlzKS5hdHRyKCdkYXRhLWF1dG9mb2N1cycpO1xuICAgICAgaWYgKGV4cGxpY2l0X2F1dG9mb2N1cyAhPT0gdm9pZCAwICYmICQoZXhwbGljaXRfYXV0b2ZvY3VzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICRhdXRvZm9jdXMgPSAkKGV4cGxpY2l0X2F1dG9mb2N1cyk7XG4gICAgICB9XG4gICAgICAkYXV0b3NlbGVjdCA9ICR0YXJnZXRfbW9kYWwuZmluZCgnW2F1dG9zZWxlY3Q9XCJhdXRvc2VsZWN0XCJdJyk7XG4gICAgICAkdGFyZ2V0X21vZGFsLnRyaWdnZXIoXCJtb2RhbF9zaG93blwiKTtcbiAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJGF1dG9zZWxlY3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiAkYXV0b3NlbGVjdC5maXJzdCgpLmZvY3VzKCkuc2VsZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICRhdXRvZm9jdXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSksIGZvY3VzX2RlbGF5KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGRpc21pc3NNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICR0YXJnZXRfbW9kYWw7XG4gICAgICAkKCdib2R5JykuY3NzKHtcbiAgICAgICAgJ21heC1oZWlnaHQnOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgICAgJCgnI21vZGFsX2JhY2tlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICR0YXJnZXRfbW9kYWwgPSAkKFwiLm1vZGFsLmFjdGl2ZVwiKTtcbiAgICAgICQoJy5tb2RhbCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWxfYWN0aXZlJyk7XG4gICAgICBmb3JjZVRvdWNoT3JpZ2luU2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgICR0YXJnZXRfbW9kYWwudHJpZ2dlcihcIm1vZGFsX2hpZGRlblwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgICQoJy5vcGVuX21vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIG9wZW5Nb2RhbC5iaW5kKHRoaXMpKGUpO1xuICAgIH0pO1xuICAgICQoJyNtb2RhbF9iYWNrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZGlzbWlzc01vZGFsKCk7XG4gICAgfSk7XG4gICAgJCgnLm1vZGFsX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGlzbWlzc01vZGFsKCk7XG4gICAgfSk7XG4gICAgJCgnLmpzX2Jvb2ttYXJrX2VkaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgYXJ0aWNsZV9pZCwgc2VsZWN0aW9uLCB0aXRsZSwgdXJsO1xuICAgICAgYXJ0aWNsZV9pZCA9ICQodGhpcykuZGF0YSgnYXJ0aWNsZS1pZCcpO1xuICAgICAgdGl0bGUgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XG4gICAgICB1cmwgPSAkKHRoaXMpLmRhdGEoJ3VybCcpO1xuICAgICAgc2VsZWN0aW9uID0gJCh0aGlzKS5kYXRhKCdzZWxlY3Rpb24nKTtcbiAgICAgICQoJyNib29rbWFya19lZGl0X2Zvcm0nKS5hdHRyKCdhY3Rpb24nLCBcIi9lZGl0L1wiICsgYXJ0aWNsZV9pZCk7XG4gICAgICAkKCcjYm9va21hcmtfZWRpdF90aXRsZScpLnZhbCh0aXRsZSk7XG4gICAgICAkKCcjYm9va21hcmtfZWRpdF91cmwnKS52YWwodXJsKTtcbiAgICAgICQoJyNib29rbWFya19lZGl0X3NlbGVjdGlvbicpLnRleHQoc2VsZWN0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcuanNfcmV2ZWFsX3N1Ym1pdF9vbmNoYW5nZSBpbnB1dCwgLmpzX3JldmVhbF9zdWJtaXRfb25jaGFuZ2Ugc2VsZWN0LCAuanNfcmV2ZWFsX3N1Ym1pdF9vbmNoYW5nZSB0ZXh0YXJlYScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJGZvcm07XG4gICAgICAkZm9ybSA9ICQodGhpcykuY2xvc2VzdCgnZm9ybScpO1xuICAgICAgaWYgKCRmb3JtLmF0dHIoJ2RhdGEtc2hvdycpKSB7XG4gICAgICAgIHNob3dIaWRlLmJpbmQoJGZvcm0pKGUpO1xuICAgICAgICAkZm9ybS5yZW1vdmVBdHRyKCdkYXRhLXNob3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRmb3JtLmZpbmQoJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiYgJCgnYm9keScpLmhhc0NsYXNzKCdtb2RhbF9hY3RpdmUnKSkge1xuICAgICAgICBkaXNtaXNzTW9kYWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xuICB9KTtcblxufSkuY2FsbCh0aGlzKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzY4ODU1YmM5LmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuQnVmZmVyLnBvb2xTaXplID0gODE5MlxuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLFxuICAvLyBDaHJvbWUgNyssIFNhZmFyaSA1LjErLCBPcGVyYSAxMS42KywgaU9TIDQuMisuIElmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nXG4gIC8vIHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcywgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnRcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuIFRoaXMgaXMgYW4gaXNzdWVcbiAgLy8gaW4gRmlyZWZveCA0LTI5LiBOb3cgZml4ZWQ6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiZcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59KSgpXG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIgKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybylcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KVxuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nXG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGhcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KVxuICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJylcbiAgICBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZylcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoKSAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpXG5cbiAgdmFyIGJ1ZlxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXNcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoXG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWVcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KVxuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpXG4gICAgICBlbHNlXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3RbaV1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldFxuICBzdHIgPSBzdHIgKyAnJ1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMlxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDJcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICtcbiAgICAgICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApXG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpXG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlXG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMlxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2UgeyAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZ1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gbGVuZ3RoXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDBcbiAgZW5kID0gKGVuZCAhPT0gdW5kZWZpbmVkKVxuICAgID8gTnVtYmVyKGVuZClcbiAgICA6IGVuZCA9IHNlbGYubGVuZ3RoXG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydClcbiAgICByZXR1cm4gJydcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzXG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDBcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpXG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLFxuICAgICAgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aClcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KVxuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydFxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmIChsZW4gPCAxMDAgfHwgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnXG4gIHZhciB0bXAgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gICAgICB0bXAgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKylcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSsxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKVxuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKVxuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmXG4gIH1cbn1cblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldClcbn1cblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgICB2YWwgfD0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXVxuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMClcbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsXG4gICAgICAgICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWREb3VibGUgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuXG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAgICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCxcbiAgICAgICAgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDBcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aFxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApXG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJylcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0JylcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJylcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdXG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSlcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPidcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiAobmV3IEJ1ZmZlcih0aGlzKSkuYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpXG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZVxuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXRcbiAgYXJyLl9zZXQgPSBhcnIuc2V0XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldFxuICBhcnIuc2V0ID0gQlAuc2V0XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGVcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTlxuICBhcnIuY29weSA9IEJQLmNvcHlcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2VcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50OFxuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFXG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkVcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRVxuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFXG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFXG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFXG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFXG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFXG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFXG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFXG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEVcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRVxuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDhcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFXG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRVxuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEVcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFXG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDhcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRVxuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFXG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEVcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRVxuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFXG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkVcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFXG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRVxuICBhcnIuZmlsbCA9IEJQLmZpbGxcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlclxuXG4gIHJldHVybiBhcnJcbn1cblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wIChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgaW5kZXggPSB+fmluZGV4OyAgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICBpbmRleCArPSBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBjb2VyY2UgKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpXG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbiAgfSkoc3ViamVjdClcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaCAoc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHxcbiAgICAgIHN1YmplY3QgJiYgdHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGIgPD0gMHg3RilcbiAgICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaVxuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKytcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSsxKSkuc3Vic3RyKDEpLnNwbGl0KCclJylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKylcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpXG4gICAgICBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyIChzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50ICh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA+PSAwLCAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG59XG5cbmZ1bmN0aW9uIGFzc2VydCAodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJylcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanNcIixcIi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG52YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuICB2YXIgQXJyID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJylcbiAgICA/IFVpbnQ4QXJyYXlcbiAgICA6IEFycmF5XG5cblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXHR2YXIgUExVU19VUkxfU0FGRSA9ICctJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSF9VUkxfU0FGRSA9ICdfJy5jaGFyQ29kZUF0KDApXG5cblx0ZnVuY3Rpb24gZGVjb2RlIChlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApXG5cdFx0aWYgKGNvZGUgPT09IFBMVVMgfHxcblx0XHQgICAgY29kZSA9PT0gUExVU19VUkxfU0FGRSlcblx0XHRcdHJldHVybiA2MiAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0ggfHxcblx0XHQgICAgY29kZSA9PT0gU0xBU0hfVVJMX1NBRkUpXG5cdFx0XHRyZXR1cm4gNjMgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpXG5cdFx0XHRyZXR1cm4gLTEgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApXG5cdFx0XHRyZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjZcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIFVQUEVSXG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheSAoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwXG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycylcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aFxuXG5cdFx0dmFyIEwgPSAwXG5cblx0XHRmdW5jdGlvbiBwdXNoICh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHZcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYpIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMilcblx0XHRcdHB1c2goKHRtcCA+PiA4KSAmIDB4RkYpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCAodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHRcdGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLCAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdFx0b3V0cHV0ID0gXCJcIixcblx0XHRcdHRlbXAsIGxlbmd0aFxuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlIChudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpXG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcClcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPT0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyAodWludDhbdWludDgubGVuZ3RoIC0gMV0pXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMClcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA+PiA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgMikgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dFxuXHR9XG5cblx0ZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5XG5cdGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjRcbn0odHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gKHRoaXMuYmFzZTY0anMgPSB7fSkgOiBleHBvcnRzKSlcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJvTWZwQW5cIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzXCIsXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwib01mcEFuXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwib01mcEFuXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIsXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzc1wiKSJdfQ==