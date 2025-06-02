import org.eclipse.apoapsis.ortserver.client.auth.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // Endpoint de Login (existente)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            LoginResponseDTO response = AuthService.login(request);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ErrorResponseDTO(e.getReason()));
        }
    }

    // Novo Endpoint de Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDTO request) {
        try {
            // Lógica diferenciada para Mestre/Player
            if (request.queroSerMestre()) {
                MasterResponseDTO response = authService.registerMaster(request);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } else {
                PlayerResponseDTO response = authService.registerPlayer(request);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ErrorResponseDTO(e.getReason()));
        }
    }
}