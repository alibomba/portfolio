import { Facebook, YouTube, Twitter, Pinterest, Instagram, Logo } from '../icons';
import Button from '../button/Button';
import './footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__left">
                <Logo />
                <div className="footer__social">
                    <a href="#" className="footer__social-link">
                        <Facebook />
                    </a>
                    <a href="#" className="footer__social-link">
                        <YouTube />
                    </a>
                    <a href="#" className="footer__social-link">
                        <Twitter />
                    </a>
                    <a href="#" className="footer__social-link">
                        <Pinterest />
                    </a>
                    <a href="#" className="footer__social-link">
                        <Instagram />
                    </a>
                </div>
            </div>
            <div className="footer__nav">
                <a href="#" className="footer__nav-link">About Us</a>
                <a href="#" className="footer__nav-link">Contact</a>
                <a href="#" className="footer__nav-link">Blog</a>
                <a href="#" className="footer__nav-link">Careers</a>
                <a href="#" className="footer__nav-link">Support</a>
                <a href="#" className="footer__nav-link">Privacy Policy</a>
            </div>
            <div className="footer__right">
                <Button>Request Invite</Button>
                <p className="footer__copy">&copy;Easybank. All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer
