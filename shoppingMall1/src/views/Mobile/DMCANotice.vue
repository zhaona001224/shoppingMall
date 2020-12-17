<template>
	<div class="common-page">
		<div class="common-breadcrumb">
			<a href="javascript:void(0)" @click="$router.push('/Mobile/Home')">Home</a> / <span>
							DMCA Notice
					</span> </div>
		<div class="title">DMCA Notice & Takedown Policy and Procedures</div>
		<div class="content"> This website (the "Site") qualifies as a "Service Provider" within the meaning
			of 17 U.S.C. § 512(k) of 17 U.S.C. § 512(k)(1) of the Digital Millennium Copyright
			Act ("DMCA"). Accordingly, it is entitled to certain protections from claims of
			copyright infringement under the DMCA, commonly referred to as the "safe harbor"
			provisions. We respect the intellectual property of others, and we ask our users
			to do the same. Accordingly, we observe and comply with the DMCA in connection
			with claims of copyright infringement arising under United States law, and have
			adopted the following Notice and Takedown Policy in connection with material appearing
			on the Site. In jurisdictions other than the United States,we observe local laws
			regarding claims of copyright infringement. </div>
		<div class="sub-title">Notice of Claimed Infringement</div>
		<div class="content"> If you believe that your work has been copied in a way that constitutes copyright
			infringement, please provide our Designated Copyright Agent (identified below)
			with the following information: </div>
		<div class="content"> (a)   an electronic or physical signature of the person authorized to act on behalf
			of the owner of the copyright; </div>
		<div class="content"> (b)   description of the copyrighted work that you claim has been infringed; </div>
		<div class="content"> (c)   a description of where the material that you claim is infringing is located
			on the Site (including the specific URL at which the allegedly infringing material
			appears); </div>
		<div class="content"> (d)   your address, telephone number, and email address; </div>
		<div class="content">
		(e)   a statement by you that you have a good faith belief that the disputed use
			is not authorized by the copyright owner, its agent, or the law; and, </div>
		<div
		 class="content"> (f)   a statement by you, made under penalty of perjury, that the above information
			in your Notice is accurate and that you are the copyright or intellectual property
			owner or authorized to act on the copyright or intellectual property owner's behalf.
			</div>
			<div class="content"> These Notice and Takedown Procedures only apply to claims of copyright infringement
				by copyright holders and their agents and not to any other kind of abuse, infringement
				or legal claim. </div>
			<div class="content"> Please do not send other inquires or information to our Designated Agent. Abusing
				the DMCA Notice procedures set forth above, or misrepresenting facts in a DMCA
				Notice or Counter-notification, can result in legal liability for damages, court
				costs and attorneys’ fees under federal law. 17 U.S.C. §512(f). </div>
			<div class="sub-title">Take Down Procedure</div>
			<div class="content"> Upon receipt of written notification provided in the manner required by 17 U.S.C.
				§ 512, we will: Remove or disable access to the material that is alleged to be
				infringing; Forward the written notification to the user who posted the allegedly
				infringing material ("User"); and Take reasonable steps to promptly notify the
				User that we have removed or disabled access to the material. </div>
			<div class="content">
			If your notification does not comply with § 512 of the DMCA, but does identify
				the allegedly infringing work, we will contact you promptly to assist you in
				complying with the notice requirements. </div>
			<div class="sub-title">Counter Notification</div>
			<div class="content"> If you are a User who has received notice from us that material that you posted
				has been removed from the Site following our receipt of a notice of claimed infringement,
				and you are the owner of the material that was removed or are otherwise authorized
				to use such material, you may provide written counter notification to our designated
				agent. Your counter notification must include substantially the following information:
				</div>
			<div class="content">(a)   Your physical or electronic signature;</div>
			<div class="content"> (b)   Identification of the material that has been removed or to which access
				has been disabled and the location at which the material appeared before it was
				removed or access to it was disabled; </div>
			<div class="content"> (c)   A statement, under penalty of perjury, that you have a good faith belief
				that the material was removed or disabled as a result of mistake or misidentification;
				</div>
			<div class="content"> (d)   Your name, address, telephone number, and e-mail address; and </div>
			<div
			 class="content"> (e)   A statement that you consent to the jurisdiction of the Federal District
				Court for the judicial district in which you are located, or if your address
				is outside of the United States, of any judicial district in which we do business,
				and that you will accept service of process from the complaining party or his
				agent. </div>
				<div class="content"> Upon receipt of written counter notification provided in the manner required
					by 17 U.S.C. § 512, we will: </div>
				<div class="content"> Promptly provide the complaining party with a copy of the counter notification;
					Inform the complaining party that we will replace the removed material or cease
					disabling access to it within ten (10) business days; Replace the removed material
					or cease disabling access to the material within ten (10) to fourteen (14) business
					days following receipt of the counter notification, provided our designated
					agent has not received notice from the complaining party that an action has
					been filed seeking a court order to restrain User from engaging in infringing
					activity relating to the material on our network or system. </div>
				<div class="content">
				Please also note that pursuant to the Digital Millennium Copyright Act, we cannot
					and do not judge the merits of your claim (or counter-claim). Accordingly, we
					will not respond to requests to remove, or disable access to, any allegedly
					infringing material, or to restore any material that has been so removed, except
					according to the procedure set forth herein or as otherwise required by law.
					</div>
				<div class="sub-title">Repeat Infringers</div>
				<div class="content"> It is the firm policy of the Site to terminate the accounts of repeat infringers,
					and/or to block such Users from posting additional content, to the extent technically
					feasible. </div>
				<div class="sub-title">Customer Service Requests</div>
				<div class="content"> Customer service inquiries sent to the DMCA agent will not receive a response.
					All such communications must be directed to the Site's customer service. </div>
				</div>
</template>
<script>
	export default {
		data() {
			return {
				data: {},
			};
		},
	};
</script>
<style lang="less" scoped="">
	.title {
		margin: 30px 0 30px;
		font-size: 22px;
		font-weight: 600;
	}
	
	.sub-title {
		margin: 20px 0 20px;
		font-size: 18px;
		font-weight: 600;
	}
	
	.nav {
		font-size: 16px;
		letter-spacing: 0px;
		color: #666666;
		margin: 20px 0;
		img {
			width: 18px;
			height: 18px;
		}
	}
	
	.content {
		color: #333;
		margin-bottom: 30px;
	}
</style>