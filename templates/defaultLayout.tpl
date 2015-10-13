<%@ Control Language="c#" AutoEventWireup="false" CodeBehind="~/Layouts/3_6/HomePageLayout.ascx.cs" Inherits="IRPortal.Layouts._3_6.HomePageLayout" %>

<div class="main-wrapper">
	<asp:PlaceHolder ID="NavigationPane" Runat="server" />
	<asp:PlaceHolder ID="HeaderPane" Runat="server" />
	<asp:PlaceHolder ID="ContentPane" Runat="server" />
	<asp:PlaceHolder ID="FooterPane" Runat="server" />
</div>