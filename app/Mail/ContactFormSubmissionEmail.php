<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmissionEmail extends Mailable
{
    use Queueable, SerializesModels;

    public array $paragraphs;

    /**
     * Create a new message instance.
     * @param string $name
     * @param string $email
     * @param string $contents
     */
    public function __construct(public $name, public $email, public $contents)
    {
        $this->paragraphs = array_filter(
            explode("\n", $this->contents)
        );
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Contact Form Submitted - ' . $this->name . ' | BjeloPIC BŽPP',
            replyTo: $this->email
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-form-submission',
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
