package org.chandima.notificationservice.service;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.chandima.notificationservice.schema.OrderPlacedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender javaMailSender;

    @KafkaListener(topics = "order-placed")
    public void listen(OrderPlacedEvent orderPlacedEvent){

        log.info("Message Received  : {}", orderPlacedEvent);
        try {
            MimeMessagePreparator messagePreparator = mimeMessage -> {
                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
                messageHelper.setFrom("eshop@gmail.com");
                messageHelper.setTo(orderPlacedEvent.getEmail().toString());
                messageHelper.setSubject("New Order placed");
                messageHelper.setText(String.format("""
                                Hello %s %s,
                                
                                Your order %s is placed successfully.
                                
                                Best Regards,
                                E-Shop.
                                
                                """,
                        orderPlacedEvent.getFirstName().toString(),
                        orderPlacedEvent.getLastName().toString(),
                        orderPlacedEvent.getOrderNumber().toString()
                ));
            };

            javaMailSender.send(messagePreparator);

        }catch(MailSendException e){
            log.error("An Error is occurred during sending the Email : ",e.getMessage());
            throw new RuntimeException("An Error is occurred during sending the Email",e);
        }

    }

}
