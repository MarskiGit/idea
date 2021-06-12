<?php

declare(strict_types=1);

namespace Idea\model;

class CsrfModel
{
    public static function verifyToken(string $requestToken, string $page): bool
    {
        $token = self::getTokens($page);
        if (empty($token) || time() > (int) $token['expiry']) {
            self::removeTokens($page);
            return false;
        }
        $sessionConfirm = hash_equals($token['session'], $requestToken);
        $cookieConfirm  = hash_equals($token['cookie'], self::getCookieToken($page));
        if ($sessionConfirm && $cookieConfirm) {
            return true;
        }
        return false;
    }
    public static function setNewToken(string $page, int $time = 86400): void
    {
        $rand_token = openssl_random_pseudo_bytes(16);
        $expiry = time() + $time;
        $sessionToken = bin2hex($rand_token);
        $cookieToken = md5(base64_encode($rand_token));
        $_SESSION['tokens'][$page] = [
            'expiry' => $expiry,
            'session'  => $sessionToken,
            'cookie' => $cookieToken,
        ];
        setcookie(self::makeCookieName($page), $cookieToken, $expiry);
    }
    public static function getInputToken(string $page): string
    {
        $token = self::getTokens($page);
        return '<input type="hidden" id="csrftoken" name="token" value="' . $token['session'] . '">';
    }
    public static function viewToken(string $page): string
    {
        $token = self::getTokens($page);
        return $token['session'];
    }
    public static function removeTokens(string $page): bool
    {
        unset($_COOKIE[self::makeCookieName($page)], $_SESSION['tokens'][$page]);
        return true;
    }
    private static function getTokens(string $page): ?array
    {
        return !empty($_SESSION['tokens'][$page]) ? $_SESSION['tokens'][$page] : null;
    }
    private static function getCookieToken(string $page): string
    {
        $value = self::makeCookieName($page);
        return !empty($_COOKIE[$value]) ? $_COOKIE[$value] : '';
    }
    private static function makeCookieName(string $page): string
    {
        return 'csrftoken-' . substr(md5($page), 0, 10);
    }
}
