import React from 'react';

class Footer extends React.Component{
    constructor(props){
        super(props);

    }
    

    render(){
        return(
            <footer class="footer bg-light">
			<div class="container">
				<div class="row">
					<ul class="list-inline mb-2">
						<li class="list-inline-item">
							<a href="#">About</a>
						</li>
						<li class="list-inline-item">&sdot;</li>
						<li class="list-inline-item">
							<a href="#">Contact</a>
						</li>
						<li class="list-inline-item">&sdot;</li>
						<li class="list-inline-item">
							<a href="#">Terms of Use</a>
						</li>
						<li class="list-inline-item">&sdot;</li>
						<li class="list-inline-item">
							<a href="#">Privacy Policy</a>
						</li>
					</ul>
					<p class="text-muted small mb-4 mb-lg-0">&copy; Your Website 2018. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
        );
    }
}

export default Footer;