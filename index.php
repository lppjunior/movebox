<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<title>Sokobox with jQuery</title>
		
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="movebox.js"></script>
		<script type="text/javascript" src="arena1.js"></script>
		
		<link rel="stylesheet" type="text/css" href="theme/movebox/game.css" />
	</head>

	<body>
		
	    <div id="aside">
			<div class="aside_content">
				<h1>Sokobox</h1>
				<h2>with jQuery</h2>
			</div>
			
			<div class="aside_content asideHigh">
				<p>
					<strong>Level</strong>
					<span class="result" id="levelValue">1</span>
				</p>
				<!--
				<p>
					<strong>Score</strong>
					<span class="result">0</span>
				</p>
				-->
			</div>
			
			<div class="aside_content nav">
				<ul>
					<li><a href="javascript:void(0)" class="reload"><span>Reload</span></a></li>
					<li><a href="javascript:void(0)" class="undo"><span>Undo</span></a></li>
					<li><a href="javascript:void(0)" class="controls"><span>Controls</span></a></li>
					<li><a href="javascript:void(0)" class="prev_level"><span>Previous level</span></a></li>
					<li><a href="javascript:void(0)" class="nex_level"><span>Next level</span></a></li>
				</ul>
			</div>
				
			<div class="nav controlsDiv">
				<p>
					<ul>
						<li><a href="javascript:void(0)" class="top"><span>Top</span></a></li>
						<li><a href="javascript:void(0)" class="left"><span>Left</span></a></li>
						<li><a href="javascript:void(0)" class="down"><span>Down</span></a></li>
						<li><a href="javascript:void(0)" class="right"><span>Right</span></a></li>
					</ul>
				</p>
			</div>
			
			<div class="aside_content asideHigh nav">
				<p>
					<strong>Time</strong>
					<span class="result" id="timer">00:00:00</span>
				</p>
				
				<div id="moves">
					<p class="moves">
						<strong>Moves</strong><br />
						<span class="result" id="moveValue">0</span>
					</p>
					<p class="pushes">
						<strong>Pushes</strong><br />
						<span class="result" id="pushValue">0</span>
					</p>
				</div>
			</div>
			
			<div class="aside_content asideHigh">
				
				<a href="javascript:void(0)" onclick="jQuery('link').attr('href', 'theme/movebox/game.css');">Socobox</a>
				&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0)" onclick="jQuery('link').attr('href', 'theme/car/game.css');">Carros</a>
				
				<p>
					<a href="http://lppjunior.com">Luiz Paulo | Web tecnology</a>
				</p>
			</div>
		</div>
		
		<div id="movebox"></div>
		<?php if(!strstr("localhost", $_SERVER['HTTP_HOST'])){ ?>
		<div id="statistcs">
			<p>
			<!--Begin Google Analytics Tracking Code-->
			<script type="text/javascript">
				var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
				document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
			</script>
			<script type="text/javascript">
				var pageTracker = _gat._getTracker("UA-684872-6");
				pageTracker._initData();
				pageTracker._trackPageview();
			</script>
			<!--End Google Analytics Tracking Code-->
			
			<!--Begin GetClicky Analytics Tracking Code-->
			<script src="http://static.getclicky.com/39064.js" type="text/javascript"></script>
			<!--End GetClicky Analytics Tracking Code-->
<?php /*
			<!-- Está muito lento! -->
			<!-- Begin W3Counter Tracking Code -->
			<script type="text/javascript" src="http://www.w3counter.com/tracker.js"></script>
			<script type="text/javascript">w3counter(13860);</script>
			<!-- End W3Counter Tracking Code-->

			<!-- Não consegui fazer funcionar -->
			<!-- ClickTale Bottom part -->
			<script src="http://s.clicktale.net/WRb.js" type="text/javascript"></script>
			<script type="text/javascript">if(typeof ClickTale=='function') ClickTale(15832,0.4);</script>
			
			<!-- ClickTale end of Bottom part -->
*/ ?>
			</p>
		</div><!--#statistics-->
		<?php } ?>
	</body>

</html>