package global.sesoc.jazart.utility;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpsRedirectFilter implements Filter {
	private FilterConfig fc;

	static final Logger log = LoggerFactory.getLogger(HttpsRedirectFilter.class);

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		if (request instanceof HttpServletRequest && response instanceof HttpServletResponse) {

			HttpServletRequest httpReq = (HttpServletRequest) request;
			String redirectTarget = httpReq.getRequestURL().toString();
			redirectTarget = redirectTarget.replaceFirst("https", "http");
			redirectTarget = redirectTarget.replaceFirst(":8443", ":9099");

			if (request.isSecure()) {
				((HttpServletResponse) response).sendRedirect(redirectTarget);
			} else {
				chain.doFilter(request, response);
			}
		}
	}

	@Override
	public void destroy() {

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		this.fc = arg0;
	}

}
