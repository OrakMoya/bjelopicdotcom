<?php

namespace App\Mail;

use App\Models\Person;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BirthdayEmail extends Mailable
{
    use Queueable, SerializesModels;

    public array $paragraphs = [];
    public string $name;

    /**
     * Create a new message instance.
     * @param string|null $birthday_text
     */
    public function __construct(public Person $person)
    {
        $this->name = $person->first_name . ' ' . $person->last_name;
        $birthday_text = $person->birthday_email_text ?? "Sretan rođendan!";

        $this->paragraphs = array_filter(
            explode("\n", $birthday_text)
        );
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Srećan Rođendan ' . $this->name . '! | BjeloPIC BŽPP',
            replyTo: 'info@bjelopic.com'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.birthday',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
