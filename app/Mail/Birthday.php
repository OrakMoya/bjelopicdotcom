<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Birthday extends Mailable
{
    use Queueable, SerializesModels;

    public $paragraphs = [];

    /**
     * Create a new message instance.
     * @param string|null $birthday_text
     */
    public function __construct(public string|null $birthday_text, public string $name)
    {
        if (!$this->birthday_text) {
            $this->birthday_text = "Sretan rođendan!";
        }

        $this->paragraphs = array_filter(
            explode("\n", $this->birthday_text)
        );
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Srećan Rođendan '. $this->name .'! | BjeloPIC BŽPP',
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
