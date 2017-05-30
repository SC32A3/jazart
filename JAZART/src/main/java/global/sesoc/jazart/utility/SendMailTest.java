package global.sesoc.jazart.utility;
import java.io.File;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
 
public class SendMailTest {
 
    public static void main(String user_id, String user_email, String title, String contents) {
         
        Properties p = System.getProperties();
        p.put("mail.smtp.starttls.enable", "true");     // gmail은 무조건 true 고정
        p.put("mail.smtp.host", "smtp.gmail.com");      // smtp 서버 주소
        p.put("mail.smtp.auth", "true");                 // gmail은 무조건 true 고정
        p.put("mail.smtp.port", "587");                 // gmail 포트
           
        Authenticator auth = new MyAuthentication();
         
        //session 생성 및  MimeMessage생성
        Session session = Session.getDefaultInstance(p, auth);
        //session.setDebug(true);
        MimeMessage msg = new MimeMessage(session);
         
        try{
        	   //String message = "Gmail SMTP 서버를 이용한 JavaMail 테스트";
        	   msg.setSubject(title);
        	   InternetAddress fromAddr = new InternetAddress(user_id+"<jazart2017@gmail.com>"); // 보내는 사람의 메일주소
        	   msg.setFrom(fromAddr);
        	   InternetAddress toAddr = new InternetAddress("jazart2017@gmail.com");  // 받는 사람의 메일주소
        	   msg.addRecipient(Message.RecipientType.TO, toAddr);
        	   
        	   BodyPart messageBodyPart = new MimeBodyPart();
        	    
        	   
        	   // Fill the message
        	   messageBodyPart.setText("*이메일 : "+user_email);
        	   Multipart multipart = new MimeMultipart();
        	   multipart.addBodyPart(messageBodyPart);
        	   
        	   messageBodyPart = new MimeBodyPart();
        	   messageBodyPart.setText(contents);
        	   multipart.addBodyPart(messageBodyPart);
        	   
        	   msg.setContent(multipart, "text/plain;charset=UTF-8");
        	   
        	   // Send the message
        	   javax.mail.Transport.send(msg);
        	   System.out.println("Gmail SMTP서버를 이용한 메일보내기 성공");

        }catch (AddressException addr_e) {
            addr_e.printStackTrace();
        }catch (MessagingException msg_e) {
            msg_e.printStackTrace();
        }
    }
 
}
 
 
class MyAuthentication extends Authenticator {
      
    PasswordAuthentication pa;
    
 
    public MyAuthentication(){
         
        String id = "jazart2017";       // 구글 ID
        String pw = "test2017";          // 구글 비밀번호
 
        // ID와 비밀번호를 입력한다.
        pa = new PasswordAuthentication(id, pw);
      
    }
 
    // 시스템에서 사용하는 인증정보
    public PasswordAuthentication getPasswordAuthentication() {
        return pa;
    }
}
