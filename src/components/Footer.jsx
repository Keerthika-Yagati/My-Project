function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Your trusted online shopping destination for quality products.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#about"><i className="fas fa-chevron-right mr-2"></i>About</a></li>
                        <li><a href="#privacy"><i className="fas fa-chevron-right mr-2"></i>Privacy</a></li>
                        <li><a href="#terms"><i className="fas fa-chevron-right mr-2"></i>Terms</a></li>
                        <li><a href="#contact"><i className="fas fa-chevron-right mr-2"></i>Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#facebook" aria-label="Facebook" title="Follow us on Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#twitter" aria-label="Twitter" title="Follow us on Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#instagram" aria-label="Instagram" title="Follow us on Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#linkedin" aria-label="LinkedIn" title="Connect on LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#youtube" aria-label="YouTube" title="Subscribe on YouTube">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section footer-copyright">
                    <p>&copy; {currentYear} Product Catalog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
